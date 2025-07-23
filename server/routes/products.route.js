import express from "express";
import { fetchProducts } from "../controllers/product.controller.js";
import { fetchProduct } from "../controllers/product.controller.js";
import requireAuth from "../middleware/require-auth.js";

const router = express.Router();

router.get("/", fetchProducts);
router.get("/:id", requireAuth, fetchProduct);

export default router;
