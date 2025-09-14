import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['farmer', 'dealer', 'deliveryAgent'],
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true, minlength: 6, select: false },
    mobile: { type: String, required: true },
    address: { type: String },
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
    userId: { type: Number, unique: true, index: true },
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
  },
  { timestamps: true } // auto adds createdAt & updatedAt
);

// 🔐 Encrypt password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// 🔑 Compare entered password with stored one
userSchema.methods.correctPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
