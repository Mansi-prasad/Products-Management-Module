import express from "express";
import {
  getProductById,
  getAllProducts,
  getPublishedProducts,
  createProduct,
  updateProduct,
  softDeleteProduct,
  publishProduct,
  unpublishProduct,
} from "../controllers/productController.js";
const router = express.Router();

// Public
router.get("/products", getPublishedProducts);

// Admin
router.get("/admin/products", getAllProducts);
router.get("/admin/products/:id", getProductById);
router.post("/admin/products", createProduct);
router.put("/admin/products/:id", updateProduct);
router.delete("/admin/products/:id", softDeleteProduct);

router.patch("/admin/products/:id/publish", publishProduct);
router.patch("/admin/products/:id/unpublish", unpublishProduct);

export default router;
