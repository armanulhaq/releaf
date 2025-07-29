import Product from "../models/products.model.js";
import connectDB from "../configs/db.js";

const fetchProducts = async (req, res) => {
    await connectDB();
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to fetch products" });
    }
};

const fetchProduct = async (req, res) => {
    await connectDB();
    const { id } = req.params; //id comes from the URL from where the request is made

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
