import express from 'express';
import { handleLogin, handleRegister, handleLogout, handleRefreshToken } from '../controllers/authController.js';

const router = express.Router();

// POST - Register a new user
router.post('/register', handleRegister);

// POST - Login an existing user
router.post('/login', handleLogin);

// POST - Logout a user (clear refresh token)
router.post('/logout', handleLogout);

// POST - Refresh the access token using the refresh token (cookie-based)
router.post('/refresh', handleRefreshToken);

export default router;
