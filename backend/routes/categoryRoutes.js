import express from 'express';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public - get all categories
router.get('/', getCategories);

// Dealers/Admin - manage categories
router.post('/', protect, restrictTo('dealer'), createCategory);
router.put('/:id', protect, restrictTo('dealer'), updateCategory);
router.delete('/:id', protect, restrictTo('dealer'), deleteCategory);

export default router;
