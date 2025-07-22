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

const fetchProduct = async (req, res) => {
    try {
        const products = await Product.findOne({ _id: req.params.id });
        console.log("PAAA", req.params.id);
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to fetch products" });
    }
};
export { fetchProducts, fetchProduct };
