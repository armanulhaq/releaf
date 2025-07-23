import express from "express";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import productRoutes from "./routes/products.route.js";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173", // my frontend origin
        credentials: true, // allows cookies to be sent
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/products", productRoutes);
app.use("/auth", authRoutes);

app.listen(3000, () => {
    console.log("Server running on 3000");
});
