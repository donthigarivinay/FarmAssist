import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import User from './models/User.js'; // ✅ Added for deliveryAgent assignment
import Order from './models/Order.js'; // ✅ Added for assigning delivery agent

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => res.send('API is running...'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// ✅ New route: Assign first available delivery agent after order
app.post('/api/orders/:id/assign-delivery', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Find first active delivery agent (you can enhance with "isActive" field later)
    const deliveryAgent = await User.findOne({ role: 'deliveryAgent' }).sort({ createdAt: 1 });

    if (!deliveryAgent) {
      return res.status(400).json({ message: 'No delivery agents available' });
    }

    order.deliveryAgent = deliveryAgent._id;
    order.status = 'Assigned to Delivery Agent';
    await order.save();

    res.json({
      message: 'Order assigned to delivery agent',
      order,
      deliveryAgent,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
