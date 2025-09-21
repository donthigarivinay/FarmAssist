import express from 'express';
import {
  getOrders,
  createOrder,
  updateOrderStatus,
  getOrderById
} from '../controllers/orderController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

// 🧑‍🌾 Farmer - place a new order
router.post('/', protect, restrictTo('farmer'), createOrder);

// 🧑‍🌾 Farmer - get their own orders
router.get('/', protect, restrictTo('farmer'), getOrders);

// 🔎 Get order details by ID (Farmer/Dealer/Delivery agent involved in order)
router.get('/:id', protect, getOrderById);

// 🏪 Dealer / 🚚 Delivery Agent - update order status
router.patch('/:id/status', protect, restrictTo('dealer', 'deliveryAgent'), updateOrderStatus);

export default router;
