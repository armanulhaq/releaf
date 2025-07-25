import express from "express";
import {
    updateCart,
    getCart,
    getCartById,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", getCart); // GET entire cart (populated)
router.post("/update", updateCart); // POST to update cart
router.get("/:id", getCartById); // GET quantity of specific product in user's cart

export default router;
