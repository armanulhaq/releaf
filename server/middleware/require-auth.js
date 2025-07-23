import { getUser } from "../middleware/auth.js";

function authenticateUser(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res
            .status(401)
            .json({ message: "Unauthorized - Invalid token" });
    }
    try {
        const user = getUser(token);
        req.user = user;
        next();
    } catch {
        return res
            .status(401)
            .json({ message: "Unauthorized - Invalid token" });
    }
}

export default authenticateUser;
