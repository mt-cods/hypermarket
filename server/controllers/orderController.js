import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

import dotenv from 'dotenv';
dotenv.config();

import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Place a new order
export const placeOrder = async (req, res) => {
  const userId = req.user.id;
  const { items, shippingAddress } = req.body;

  if (!userId || !Array.isArray(items) || items.length === 0 || !shippingAddress) {
    return res.status(400).json({ message: 'User, items, and shipping address are required.' });
  }

  const requiredFields = ['fullName', 'phone', 'street', 'city', 'state', 'postalCode', 'country'];
  const missingFields = requiredFields.filter(field => !shippingAddress[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({ message: `Missing shipping address fields: ${missingFields.join(', ')}` });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const line_items = [];
    let totalAmount = 0;

    // Loop through the items to get product details and calculate total amount
    for (const { productId, quantity } of items) {
      const product = await Product.findById(productId);
      if (!product || quantity < 1) {
        return res.status(400).json({ message: `Invalid product or quantity: ${productId}` });
      }

      const productTotal = product.price * quantity;
      totalAmount += productTotal;

      line_items.push({
        price_data: {
          currency: 'inr', // Change this based on your currency
          product_data: {
            name: product.name,
            description: product.description || 'No description available',
          },
          unit_amount: product.price * 100, // Amount in smallest currency unit (i.e., paise for INR)
        },
        quantity: quantity,
      });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['IN'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 50,
              currency: 'inr',
            },
            display_name: 'Standard Shipping',
          },
        },
      ],
      // Ensure success_url and cancel_url are full URLs (with https)
      success_url: `${process.env.CLIENT_URL}/orders`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
      metadata: {
        userId,
        shippingFullName: shippingAddress.fullName,
        shippingPhone: shippingAddress.phone,
      },
    });


    // After creating the Stripe session, we will save the order in the database
    const order = new Order({
      user: userId,
      items,
      shippingAddress,
      totalAmount, // Save the total amount for future reference
      status: 'pending', // Status will change to 'paid' after successful payment
      stripeSessionId: session.id, // Store the Stripe session ID
    });

    await order.save();

    user.cart.clear();
    await user.save();

    // Respond with the session ID so the client can redirect to Stripe Checkout
    res.status(201).json({ message: 'Order placed successfully', sessionId: session.id });

  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all orders for the logged-in user
export const getUserOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

// Admin: Get all orders in the system
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email') // show user info
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch all orders', error: error.message });
  }
};

// Controller function to update order status
export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const validStatuses = ['pending', 'preparing', 'out_for_delivery', 'delivered'];  
  
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' }); 
  }

  try {
    
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' }); 
    }

    
    order.status = status;
    await order.save();

    
    return res.status(200).json({ message: 'Order status updated', order }); 
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to update order status' }); 
  }
};
