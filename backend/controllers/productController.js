import Product from "../models/Product.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("dealer", "name email");
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("dealer", "name email");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create new product (Dealer only)
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    const product = new Product({
      name,
      description,
      price,
      stock,
      category,
      dealer: req.user.id // from auth middleware
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update product (Dealer only)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, dealer: req.user.id },
      req.body,
      { new: true }
    );

    if (!product) return res.status(404).json({ message: "Product not found or unauthorized" });
    res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete product (Dealer only)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, dealer: req.user.id });
    if (!product) return res.status(404).json({ message: "Product not found or unauthorized" });
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
