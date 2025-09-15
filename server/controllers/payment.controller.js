import Stripe from "stripe";
import User from "../models/user.model.js";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

async function paymentHandler(req, res) {
    const { product, success_url, cancel_url, metadata } = req.body;

    const line_items = product.map((item) => ({
        price_data: {
            currency: "INR",
            product_data: {
                name: item.product.name,
                images: [item.product.images[0]],
            },
            unit_amount: item.product.discountPrice * 100, // in paise
        },
        quantity: item.quantity,
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url,
            cancel_url,
            metadata: metadata,
        });
        res.status(200).json({ session });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ message: "Server error", error });
    }
}

async function webhookHandler(req, res) {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
        const body = req.rawBody || req.body;
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error("Webhook signature verification failed.", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        // STEP 1: Get the user ID from metadata (you need to send this from frontend)
        const userId = session.metadata.userId;

        if (!userId)
            return res.status(400).json({ message: "User ID missing" });

        // STEP 2: Get the user's cart from the database
        const user = await User.findById(userId).populate("cart.product"); //Replaces the product field inside each item of the user.cart array with the full product document
        if (!user) return res.status(404).json({ message: "User not found" });

        // STEP 3: Save order to the user
        user.orders.push({
            products: user.cart.map((item) => ({
                product: item.product._id,
                quantity: item.quantity,
            })),
            totalAmount: session.amount_total / 100, // Stripe gives in paise
            paymentIntentId: session.payment_intent,
        });

        // STEP 4: Clear cart after order
        user.cart = [];

        await user.save();
    }

    res.json({ received: true });
}

export { paymentHandler, webhookHandler };
