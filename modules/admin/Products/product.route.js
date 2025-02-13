import express from "express";
import productController from '../Products/product.controller.js'

import multer from "multer";

const router = express.Router();


const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image")


router.post("/create-product", upload, productController.createProduct);
router.get("/get-product", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", upload, productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;
