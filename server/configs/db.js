import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect(process.env.ATLAS_URL);
    console.log("MongoDB connected");
};

export default connectDB;
