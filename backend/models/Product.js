import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, default: 0, min: 0 },
    image: { type: String }, // Can be URL or Cloudinary link
    dealerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    storeLocation: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

// 🔍 Index for faster searching by name & category
productSchema.index({ name: 'text', category: 1 });

export default mongoose.model('Product', productSchema);
