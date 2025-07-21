import mongoose from "mongoose";
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.ATLAS_URL);
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
        process.exit(1);
    }
};

export default connectDB;
