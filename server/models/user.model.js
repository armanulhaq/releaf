import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        //cart will be an array of objects that has product ID that refrences to Product Model and quantity
        cart: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                quantity: Number,
            },
        ],
        //orders will be an array of objects that contains array of all the products, the total amount, paymentID, createdID
        orders: [
            {
                products: [
                    {
                        product: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "Product",
                        },
                        quantity: Number,
                    },
                ],
                totalAmount: Number,
                paymentIntentId: String,
                createdAt: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
