import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactInquiriesRouter from "./contact-inquiries";
import registrationsRouter from "./registrations";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactInquiriesRouter);
router.use(registrationsRouter);

export default router;
