import express from "express";
import {
    updateCart,
    getCart,
    getCartById,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", getCart);
router.post("/update", updateCart);
router.get("/:id", getCartById);

export default router;
