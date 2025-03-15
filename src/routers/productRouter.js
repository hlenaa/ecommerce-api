import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.js";
import schemaChecker from "../middleware/schemaCheck.js";
import { productSchema, updateProductSchema } from "../schemas/productSchema.js";
import categoryExistsChecker from "../middleware/categoryExists.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", categoryExistsChecker, schemaChecker(productSchema), createProduct);
router.put("/:id", schemaChecker(updateProductSchema), updateProduct);
router.delete("/:id", deleteProduct);

export default router;