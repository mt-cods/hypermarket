import express from 'express';
import { updateCart, getCart } from '../../controllers/cartController.js';
import verifyJWT from '../../middleware/verifyJWT.js';

const router = express.Router();

// Update cart (add/update/remove product)
router.post('/update', verifyJWT, updateCart);

// Get cart by user ID
router.get('/', verifyJWT, getCart);

export default router;