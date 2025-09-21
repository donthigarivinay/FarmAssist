import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    // 🔹 Name of the product (unchanged)
    name: { type: String, required: true, trim: true },

    // 🔹 Category as string to simplify frontend mapping (updated)
    category: { type: String, required: true, trim: true },

    // 🔹 Product description (unchanged)
    description: { type: String, trim: true },

    // 🔹 Price of the product (unchanged)
    price: { type: Number, required: true, min: 0 },

    // 🔹 Stock instead of quantity to match frontend naming (updated)
    stock: { type: Number, default: 0, min: 0 },

    // 🔹 Image URL with default placeholder (updated)
    image: { type: String, default: '/placeholder.svg' },

    // 🔹 Dealer reference (unchanged)
    dealerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // 🔹 Product status to manage active/inactive products (added)
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },

    // 🔹 Optional store location for dealer (unchanged)
    storeLocation: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

// 🔍 Index for faster searching by name & category (unchanged)
productSchema.index({ name: 'text', category: 1 });

// 🔹 Export the model
export default mongoose.model('Product', productSchema);
