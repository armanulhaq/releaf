import express from "express";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log("Server running on 3000");
});
