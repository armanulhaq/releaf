import express from "express";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import productRoutes from "./routes/products.route.js";
import authRoutes from "./routes/auth.route.js";
import cartRoutes from "./routes/cart.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import paymentRoutes from "./routes/payment.route.js";

dotenv.config();
connectDB();

const app = express();

app.use(
    cors({
        origin: ["https://releaf-store.vercel.app", "http://localhost:5173"],
        credentials: true,
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    })
);

app.use(cookieParser());
app.use("/api/payment", paymentRoutes);
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "ReLeaf API is running!",
        status: "healthy",
    });
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
