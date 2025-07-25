import express from "express";
import paymentHandler from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-checkout-session", paymentHandler);

export default router;
