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
        origin: "http://localhost:5173", // my frontend origin
        credentials: true, // allows cookies to be sent
    })
);

app.use(cookieParser());
app.use("/payment", paymentRoutes); //handling this before using express.json() middleware because stripe requires rawBody
app.use(express.json()); //it is a middleware that takes up the json coming in from Frontend in the form of credentials and attaches it to req.body before authRoutes read it

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/products", productRoutes);
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);

app.listen(3000, () => {
    console.log("Server running on 3000");
});
