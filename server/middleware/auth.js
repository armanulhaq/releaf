import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET;

function setUser(user) {
    return jwt.sign({ _id: user._id, email: user.email }, secret);
}

function getUser(token) {
    return jwt.verify(token, secret);
}

export { setUser, getUser };
