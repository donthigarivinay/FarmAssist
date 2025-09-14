import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);          // Get all products
router.get('/:id', getProductById);   // Get single product by ID

// Protected routes (dealers only)
router.post('/', protect, restrictTo('dealer'), createProduct);
router.put('/:id', protect, restrictTo('dealer'), updateProduct);
router.delete('/:id', protect, restrictTo('dealer'), deleteProduct);

export default router;
