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
        origin: [/https:\/\/.*\.vercel\.app$/, process.env.CLIENT_URL].filter(
            Boolean
        ),
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    })
);

app.use(cookieParser());
app.use("/api/payment", paymentRoutes);
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "ReLeaf API is running!",
        version: "1.0.0",
        status: "healthy",
        timestamp: new Date().toISOString(),
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        status: "healthy",
        database: "connected",
        timestamp: new Date().toISOString(),
    });
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);

// Export for Vercel
export default app;
