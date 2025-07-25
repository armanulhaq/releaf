import { getUser, setUser } from "../middleware/auth.js";
import User from "../models/user.model.js";

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const doesExist = await User.findOne({ email });
        if (doesExist) {
            return res.status(409).json({ message: "User already exists" });
        }
        User.create({
            name: name,
            email: email,
            password: password,
            cart: [],
            orders: [],
        });
        return res
            .status(200)
            .json({ message: "User successfully registered" });
    } catch (error) {
        return res.status(500).json({ message: "Failed to register" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
        return res.status(400).json({ message: "Please register first." });
    }
    const token = setUser(user);

    //send a cookie with the respobse
    res.cookie("token", token, {
        httpOnly: true, // Prevents JS access — good for security
        sameSite: "None", // allows us to send from 3000 to 5173
        secure: true, // Set to true only in production over HTTPS
        maxAge: 1000 * 60 * 60, // 1 hour
    });
    return res.status(200).json({ message: "Successfully logged you in" });
};

const authMe = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = getUser(token);
        const user = await User.findById(decoded._id)
            .select("email orders name") // include only email, name and orders
            .populate("orders.products.product", "name images discountPrice");

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

const logout = (req, res) => {
    res.cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: "None",
        secure: true,
    });
    return res.status(200).json({ message: "Logged out" });
};

export { register, login, authMe, logout };
