import { Router, type IRouter } from "express";
import {
  CreateContactInquiryBody,
  CreateContactInquiryResponse,
} from "@workspace/api-zod";
import { contactInquiriesTable, db } from "@workspace/db";

const router: IRouter = Router();

router.post("/contact-inquiries", async (req, res): Promise<void> => {
  const rawBody = req.body;
  const normalizedBody =
    typeof rawBody === "object" && rawBody !== null
      ? {
          ...rawBody,
          fullName:
            typeof rawBody.fullName === "string"
              ? rawBody.fullName.trim()
              : rawBody.fullName,
          email:
            typeof rawBody.email === "string"
              ? rawBody.email.trim()
              : rawBody.email,
          organization:
            typeof rawBody.organization === "string"
              ? rawBody.organization.trim() || null
              : rawBody.organization,
          message:
            typeof rawBody.message === "string"
              ? rawBody.message.trim()
              : rawBody.message,
        }
      : rawBody;
  const body = CreateContactInquiryBody.safeParse(normalizedBody);

  if (!body.success) {
    req.log.warn(
      { issueCount: body.error.issues.length },
      "Rejected invalid contact enquiry",
    );
    res.status(400).json({
      error: "Please check the enquiry details and try again.",
    });
    return;
  }

  try {
    const [inquiry] = await db
      .insert(contactInquiriesTable)
      .values({
        ...body.data,
        organization: body.data.organization ?? null,
      })
      .returning({
        id: contactInquiriesTable.id,
        receivedAt: contactInquiriesTable.receivedAt,
      });

    if (!inquiry) {
      res.status(500).json({
        error: "The enquiry could not be saved. Please try again.",
      });
      return;
    }

    res.status(201).json(
      CreateContactInquiryResponse.parse({
        ...inquiry,
        message: "Your enquiry has been received.",
      }),
    );
  } catch (error) {
    req.log.error({ err: error }, "Unable to store contact enquiry");
    res.status(500).json({
      error: "The enquiry could not be saved. Please try again.",
    });
  }
});

export default router;
