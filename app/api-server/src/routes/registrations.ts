import { Router, type IRouter } from "express";
import {
  CreateRegistrationBody,
  CreateRegistrationResponse,
} from "@workspace/api-zod";
import { contactInquiriesTable, db } from "@workspace/db";

const router: IRouter = Router();

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
  const registrationId = `ACFTA-2026-${codePrefix}-${rand}`;

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

    res.status(201).json(
      CreateRegistrationResponse.parse({
        id: record.id,
        registrationId,
        streamKey: data.streamKey,
        receivedAt: record.receivedAt,
        message: "Your registration has been received.",
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
