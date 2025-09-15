import express from "express";
import { fetchProducts } from "../controllers/product.controller.js";
import { fetchProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", fetchProducts);
router.get("/:id", fetchProduct);

export default router;
