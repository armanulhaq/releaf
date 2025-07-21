import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        shortDescription: {
            type: String,
            required: true,
            maxlength: 20,
        },
        longDescription: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        originalPrice: {
            type: Number,
            required: true,
        },
        discountPrice: {
            type: Number,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        images: [
            {
                type: String,
                required: true,
            },
        ],
        material: {
            type: String,
            required: true,
        },
        inStock: {
            type: Boolean,
            required: true,
            default: true,
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Product", productSchema);
