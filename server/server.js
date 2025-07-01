import express from "express";
const app = express();

import mongoose from "mongoose";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 3000;

import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/database.js';

// import verifyJWT from './middleware/verifyJWT.js';

import authRouter from './routes/authRouter.js';
import productRouter from './routes/api/productRouter.js';
import cartRouter from './routes/api/cartRouter.js';
import orderRouter from './routes/api/orderRouter.js';

// Connect to MongoDB
connectDB(); // ⬅️ Connect to MongoDB here

// Only start server after MongoDB is ready
mongoose.connection.once('open', () => {
  console.log('🧠 MongoDB connection ready');
  app.listen(process.env.PORT || 5000, () => {
    console.log('🚀 Server running');
  });
});

// Built-in middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // 3rd party middleware
// import corsOptions from './config/corsOptions.js';
app.use(cors());
// app.use(cookieParser())

// // Authentication Routes
app.use('/auth', authRouter);

// // API routes
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});