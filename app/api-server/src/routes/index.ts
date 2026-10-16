import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactInquiriesRouter from "./contact-inquiries";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactInquiriesRouter);

export default router;
