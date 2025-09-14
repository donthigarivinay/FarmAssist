import Order from "../models/Order.js";
import Product from "../models/Product.js";

// Place order
export const placeOrder = async (req, res) => {
  try {
    const { products, deliveryAddress, paymentMethod } = req.body;

    // reduce stock
    for (const p of products) {
      let item = await Product.findById(p.productId);
      if (!item || item.stock < p.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${item?.name}` });
      }
      item.stock -= p.quantity;
      await item.save();
    }

    const order = new Order({
      user: req.user.id,
      products,
      deliveryAddress,
      paymentMethod,
      status: "Pending",
    });

    await order.save();
    res.status(201).json({ message: "Order placed", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("products.productId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Dealer: get orders for their products
export const getDealerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ "products.dealerId": req.user.id }).populate("products.productId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update order status (Dealer/Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
