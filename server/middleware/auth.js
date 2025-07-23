import "../configs/env.js";
import jwt from "jsonwebtoken";

const secret = process.env.JWTSECRET;

function setUser(user) {
    return jwt.sign({ _id: user._id, email: user.email }, secret);
}

function getUser(token) {
    return jwt.verify(token, secret);
}

export { setUser, getUser };
