import multer from 'multer';
import express from 'express';

import productController from '../../controllers/productController.js';

const router = express.Router();

// Configure multer for storing uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    const sanitizeFilename = (filename) =>
      filename.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-\.]/g, '');

    const uniqueName = `${Date.now()}-${sanitizeFilename(file.originalname)}`;

    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// POST - Create a product
router.post('/', upload.single('image'), productController.createProduct);

// GET - Get all products
router.get('/', productController.getAllProducts);

// GET- Get all products of a category 
router.get('/category/:categorySlug', productController.getProductsByCategory);

// GET - Get a product by ID
router.get('/:id', productController.getProductById);

// PUT - Update a product by ID
router.put('/:id', productController.updateProduct);

// DELETE - Delete a product by ID
router.delete('/:id', productController.deleteProduct);

export default router;