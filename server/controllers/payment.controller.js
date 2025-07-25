import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

async function paymentHandler(req, res) {
    const { product, success_url, cancel_url } = req.body;
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
        });
        res.status(200).json({ session });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ message: "Server error", error });
    }
}

export default paymentHandler;
