import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        if (mongoose.connections[0].readyState) {
            return;
        }

        await mongoose.connect(process.env.ATLAS_URL);
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
    }
};

export default connectDB;
