import { setUser } from "../middleware/auth.js";
import User from "../models/user.model.js";

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const doesExist = User.findOne({ email: email });
        if (doesExist) {
            return res.status(400).json({ message: "User exists already" });
        }
        User.create({
            name: name,
            email: email,
            password: password,
        });
        return res
            .status(200)
            .json({ message: "User successfully registered" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to register" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({ email, password });
    if (!user) {
        return res.status(400).json({ message: "Please register first." });
    }
    const token = setUser(user);
    res.cookie("token", token, {
        httpOnly: true, // ✅ Prevents JS access — good for security
        sameSite: "None", // ✅ Allows cookie on same-site navigation (or use "None" for cross-site + HTTPS)
        secure: true, // ✅ Set to true only in production over HTTPS
        maxAge: 1000 * 60 * 60, // ✅ 1 hour (your value was too low — 100 * 60 * 60 = just 6 seconds)
    });
    return res.status(200).json({ message: "Successfully logged you in" });
};

export { register, login };
