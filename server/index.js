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
        origin: ["http://localhost:5173", "https://*.vercel.app"],
        credentials: true,
    })
);

app.use(cookieParser());
app.use("/api/payment", paymentRoutes);
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World - ReLeaf API is running!");
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);

// Export for Vercel
export default app;

// Only listen in development
if (process.env.NODE_ENV !== "production") {
    app.listen(3000, () => {
        console.log("Server running on 3000");
    });
}
