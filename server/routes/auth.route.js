import express from "express";
import {
    register,
    login,
    authMe,
    logout,
} from "../controllers/authentication.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMe);
router.post("/logout", logout);

export default router;
