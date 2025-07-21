import express from "express";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import productRoutes from "./routes/products.route.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

app.use(cors()); //enables CORS for all routes
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/products", productRoutes);

app.listen(3000, () => {
    console.log("Server running on 3000");
});
