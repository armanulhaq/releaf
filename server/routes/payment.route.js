import express from "express";
import {
    webhookHandler,
    paymentHandler,
} from "../controllers/payment.controller.js";

const router = express.Router();

// Route for Stripe checkout session uses JSON body
router.post("/create-checkout-session", express.json(), paymentHandler); //needs the middleware

// Route for Stripe webhook (uses RAW body + sets req.rawBody)
router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    (req, res, next) => {
        req.rawBody = req.body;
        next();
    },
    webhookHandler
);

export default router;
