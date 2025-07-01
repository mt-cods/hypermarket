import Product from '../models/Product.js';
import { categories_url_slug } from './config.js';

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, brand, price, description, category, inStock } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !brand || !price || !image || !category) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newProduct = new Product({
      name,
      brand,
      price,
      image,
      description,
      category,
      inStock,
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Get all products of a category
const getProductsByCategory = async (req, res) => {
  try {
    const { categorySlug } = req.params;
    const slugToCategoryMap = Object.fromEntries(
      Object.entries(categories_url_slug).map(([name, slug]) => [slug, name])
    );

    const getCategoryNameFromSlug = (slug) => slugToCategoryMap[slug] || null;
    const categoryName = getCategoryNameFromSlug(categorySlug);

    // Find products that match the given categorySlug
    const products = await Product.find({ category: categoryName });

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching category products:', error);
    res.status(500).json({ message: 'Error fetching category products', error: error.message });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, brand, price, image, description, category, inStock } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, brand, price, image, description, category, inStock },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

export default {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  getProductById,
  updateProduct,
  deleteProduct
};