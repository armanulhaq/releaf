import Product from "../models/products.model.js";

const fetchProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to fetch products" });
    }
};

import mongoose from "mongoose";

const fetchProduct = async (req, res) => {
    const { id } = req.params;

    // Validate ObjectId to avoid CastError
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product id" });
    }

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to fetch product" });
    }
};
export { fetchProducts, fetchProduct };
