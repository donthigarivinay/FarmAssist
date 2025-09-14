// controllers/productController.js
import mongoose from 'mongoose';


export const getProducts = async (req, res) => {
  try {
    // You can later replace this with real DB logic
    res.status(200).json({ message: 'Fetching all products' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createProduct = async (req, res) => {
  try {
    // You can later replace this with real DB logic
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
