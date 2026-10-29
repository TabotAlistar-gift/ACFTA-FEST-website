import { Router, type IRouter } from "express";
import {
  CreateRegistrationBody,
  CreateRegistrationResponse,
} from "@workspace/api-zod";
import { contactInquiriesTable, db } from "@workspace/db";

const router: IRouter = Router();

const PATHWAY_TITLES: Record<string, string> = {
  delegate: "High-Level Cross-Border Deal Making",
  vendor: "Vendors & Exhibitors",
  volunteer: "Festival Volunteers",
  attendee: "General Attendees & Observers",
};

const recentIdempotencyCache = new Map<
  string,
  { id: number; registrationId: string; receivedAt: Date }
>();

async function sendServerConfirmationEmail(
  data: {
    fullName: string;
    email: string;
    phone: string;
    country: string;
    organization: string;
    role: string;
    streamKey: string;
    streamOption: string;
  },
  registrationId: string,
  log: { info: (...args: unknown[]) => void; error: (...args: unknown[]) => void },
): Promise<boolean> {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return false;
  }

  const fromAddress =
    process.env.REGISTRATION_EMAIL_FROM ||
    "ACFTA Fest Secretariat <registration@acftafest.com>";
  const pathwayTitle = PATHWAY_TITLES[data.streamKey] || data.streamKey;

  const html = `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #dfd7c6; border-radius: 12px; overflow: hidden; color: #062319;">
      <div style="background: #062319; color: #fcfbf8; padding: 28px 24px; border-bottom: 3px solid #ECDA62;">
        <p style="margin: 0 0 6px; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #ECDA62; font-weight: 700;">ACFTA Fest — Banjul, The Gambia</p>
        <h1 style="margin: 0; font-size: 22px; color: #ffffff;">Your ACFTA Fest Registration Confirmation</h1>
      </div>
      <div style="padding: 24px; background: #ffffff;">
        <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6;">Dear <strong>${data.fullName}</strong>,</p>
        <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.6;">Thank you for registering for <strong>ACFTA Fest</strong>. Your registration has been officially received and recorded under the <strong>${pathwayTitle}</strong> pathway.</p>
        <div style="background: #062319; color: #ffffff; padding: 16px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
          <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(252,251,248,0.75);">Registration Reference ID</span>
          <strong style="display: block; font-size: 20px; color: #ECDA62; margin-top: 4px; letter-spacing: 0.06em;">${registrationId}</strong>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #e6dfd0; color: #59695e;">Participation Pathway</td><td style="padding: 8px 0; border-bottom: 1px solid #e6dfd0; font-weight: 700; text-align: right;">${pathwayTitle}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #e6dfd0; color: #59695e;">Selected Focus</td><td style="padding: 8px 0; border-bottom: 1px solid #e6dfd0; font-weight: 700; text-align: right;">${data.streamOption}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #e6dfd0; color: #59695e;">Organization / Role</td><td style="padding: 8px 0; border-bottom: 1px solid #e6dfd0; font-weight: 700; text-align: right;">${data.organization} (${data.role})</td></tr>
          <tr><td style="padding: 8px 0; color: #59695e;">Country</td><td style="padding: 8px 0; font-weight: 700; text-align: right;">${data.country}</td></tr>
        </table>
        <h2 style="font-size: 15px; margin: 0 0 8px; color: #062319;">Next Steps</h2>
        <p style="margin: 0 0 18px; font-size: 14px; line-height: 1.6; color: #42554b;">Please retain your Registration Reference ID (<strong>${registrationId}</strong>). Our Accreditation &amp; Protocol Secretariat will follow up with your venue pass instructions and programme schedule ahead of the Banjul gathering.</p>
        <div style="padding-top: 16px; border-top: 1px solid #e6dfd0; font-size: 13px; color: #59695e;">
          <strong>Official Registration Support:</strong><br />
          Email: <a href="mailto:registration@acftafest.com" style="color: #a6533b;">registration@acftafest.com</a> | <a href="mailto:info@acftafest.com" style="color: #a6533b;">info@acftafest.com</a><br />
          Tel: +234 806 344 5195
        </div>
      </div>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [data.email],
        subject: "Your ACFTA Fest Registration Confirmation",
        html,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      log.error(
        { status: response.status, details: errorText, registrationId },
        "Confirmation email provider returned non-2xx response",
      );
      return false;
    }

    log.info({ registrationId }, "Dispatched registration confirmation email");
    return true;
  } catch (err) {
    log.error(
      { err, registrationId },
      "Failed to dispatch registration confirmation email",
    );
    return false;
  }
}

router.post("/registrations", async (req, res): Promise<void> => {
  const parsed = CreateRegistrationBody.safeParse(req.body);

  if (!parsed.success) {
    req.log.warn(
      { issues: parsed.error.issues },
      "Rejected invalid registration payload",
    );
    res.status(400).json({
      error:
        parsed.error.issues[0]?.message ||
        "Please check your registration details and try again.",
      issues: parsed.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  const data = parsed.data;
  const codePrefix =
    data.country
      .replace(/[^a-zA-Z]/g, "")
      .slice(0, 3)
      .toUpperCase() || "AFR";
  const rand = Math.floor(1000 + Math.random() * 9000);
  const registrationId =
    data.registrationId && /^ACFTA-2026-[A-Z]{2,4}-\d{4}$/.test(data.registrationId)
      ? data.registrationId
      : `ACFTA-2026-${codePrefix}-${rand}`;

  const idempotencyKey = `${data.email.toLowerCase()}::${data.streamKey}::${registrationId}`;
  const existingRecord = recentIdempotencyCache.get(idempotencyKey);

  if (existingRecord) {
    const emailDispatched = await sendServerConfirmationEmail(
      data,
      existingRecord.registrationId,
      req.log,
    );
    res.status(200).json(
      CreateRegistrationResponse.parse({
        id: existingRecord.id,
        registrationId: existingRecord.registrationId,
        streamKey: data.streamKey,
        receivedAt: existingRecord.receivedAt,
        message: "Your registration has been received.",
        emailDispatched,
      }),
    );
    return;
  }

  const formattedMessage = [
    `[OFFICIAL FESTIVAL REGISTRATION — ${registrationId}]`,
    `Pathway: ${data.streamKey.toUpperCase()}`,
    `Full Name: ${data.fullName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Country: ${data.country}`,
    `Organization: ${data.organization}`,
    `Role: ${data.role}`,
    `Track Option: ${data.streamOption}`,
    `Notes: ${data.notes}`,
  ].join("\n");

  try {
    const [record] = await db
      .insert(contactInquiriesTable)
      .values({
        fullName: data.fullName,
        email: data.email,
        organization: `${data.organization} (${data.role})`,
        category: "programme",
        message: formattedMessage,
      })
      .returning({
        id: contactInquiriesTable.id,
        receivedAt: contactInquiriesTable.receivedAt,
      });

    if (!record) {
      res.status(500).json({
        error: "Your registration could not be saved. Please try again.",
      });
      return;
    }

    recentIdempotencyCache.set(idempotencyKey, {
      id: record.id,
      registrationId,
      receivedAt: record.receivedAt,
    });

    const emailDispatched = await sendServerConfirmationEmail(
      data,
      registrationId,
      req.log,
    );

    res.status(201).json(
      CreateRegistrationResponse.parse({
        id: record.id,
        registrationId,
        streamKey: data.streamKey,
        receivedAt: record.receivedAt,
        message: "Your registration has been received.",
        emailDispatched,
      }),
    );
  } catch (error) {
    req.log.error({ err: error }, "Unable to store registration");
    res.status(500).json({
      error: "Your registration could not be saved. Please try again.",
    });
  }
});

export default router;
