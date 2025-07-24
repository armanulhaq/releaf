import express from "express";
import { updateCart, getCart } from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/update", updateCart);
router.get("/:id", getCart);

export default router;
