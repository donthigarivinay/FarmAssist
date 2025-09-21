import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      password, 
      role, 
      mobile, 
      address,
      // Dealer fields
      shopNumber,
      licenseId,
      shopAddress,
      shopLicenseNumber,
      shopLicenseImage,
      // Delivery Agent fields
      vehicleType,
      vehicleNumber,
      drivingLicenseImage
    } = req.body;

    if (!name || !email || !password || !role || !mobile) {
      return res.status(400).json({ message: 'All required fields must be provided: name, email, password, role, mobile.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }
    if (!['farmer', 'dealer', 'deliveryAgent'].includes(role)) {
      return res.status(400).json({ message: 'Role must be farmer, dealer, or deliveryAgent.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = new User({
      name,
      email,
      password,
      role,
      mobile,
      address,
      // Dealer
      shopNumber,
      licenseId,
      shopAddress,
      shopLicenseNumber,
      shopLicenseImage,
      // Delivery Agent
      vehicleType,
      vehicleNumber,
      drivingLicenseImage
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email & password required' });

    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.correctPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    const { password: _, ...userData } = user._doc;
    res.status(200).json({ token, user: userData });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
