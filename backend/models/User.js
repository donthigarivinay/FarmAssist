import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['farmer', 'dealer', 'deliveryAgent'],
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  userId: { type: Number, unique: true },
  profileImage: { type: String }, // URL or base64 string

  // Farmer-specific
  farmDetails: {
    crops: [String],
    landSize: { type: String },
  },

  // Dealer-specific
  shopLicenseNumber: { type: String },
  shopLicenseImage: { type: String }, // URL or base64

  // Delivery agent-specific
  vehicleType: { type: String },
  vehicleNumber: { type: String },
  drivingLicenseImage: { type: String },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('User', userSchema);
