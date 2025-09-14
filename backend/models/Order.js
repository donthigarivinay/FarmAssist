import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    dealerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    deliveryAgentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
      },
    ],
    totalAmount: { type: Number, required: true, min: 0 },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['cod', 'upi', 'card', 'netbanking'],
      default: 'cod',
    },
    deliveryStatus: {
      type: String,
      enum: ['placed', 'dispatched', 'in-transit', 'delivered', 'cancelled'],
      default: 'placed',
    },
    deliveryAddress: { type: String, required: true },
  },
  { timestamps: true } // adds orderedAt & updatedAt automatically
);

// Indexes for faster queries
orderSchema.index({ farmerId: 1, dealerId: 1, deliveryAgentId: 1 });
orderSchema.index({ deliveryStatus: 1 });
orderSchema.index({ paymentStatus: 1 });

export default mongoose.model('Order', orderSchema);
