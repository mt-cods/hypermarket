import express from 'express';
import {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} from '../../controllers/orderController.js';
import verifyJWT from '../../middleware/verifyJWT.js';
import verifyRoles from '../../middleware/verifyRoles.js';

const router = express.Router();

// Authenticated user routes
router.post('/', verifyJWT, placeOrder);
router.get('/my', verifyJWT, getUserOrders);

// Admin route
router.get('/', verifyJWT, verifyRoles, getAllOrders);
router.patch('/:orderId/status', verifyJWT, verifyRoles, updateOrderStatus);

export default router;
