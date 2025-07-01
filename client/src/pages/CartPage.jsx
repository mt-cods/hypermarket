import React, { useEffect, useState } from 'react';
import axiosInstance from '../components/axiosInstance.js';
import { FaBasketShopping } from "react-icons/fa6";
import { API_URL } from './config.js';

import { Link } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const cartRes = await axiosInstance.get(`${API_URL}/api/cart`);
      const cart = cartRes.data.cart;

      const productPromises = Object.entries(cart).map(async ([productId, quantity]) => {
        const productRes = await axiosInstance.get(`${API_URL}/api/products/${productId}`);
        return { product: productRes.data, quantity };
      });

      const productsWithQuantity = await Promise.all(productPromises);
      setCartItems(productsWithQuantity);
      setLoading(false);
    } catch (err) {
      setError('Failed to load cart data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateCartItem = async (productId, quantity) => {
    try {
      await axiosInstance.post(
        `${API_URL}/api/cart/update`,
        {
          items: [{ productId, quantity }]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        }
      );
      fetchCart(); // Refresh cart after update
    } catch (err) {
      console.error('Failed to update cart item:', err.response?.data?.message || err.message);
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>{error}</p>;

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <FaBasketShopping className="text-[#0c6c6e]" size={24} />
          Your Shopping Basket
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Cart Items */}
          <div className="md:w-2/3 w-full">
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cartItems.map(({ product, quantity }) => (
                <div key={product._id} className="flex border-b pb-4 mb-4">
                  <img
                    src={API_URL + product.image}
                    alt={product.name}
                    className="w-24 h-32 object-contain rounded"
                  />
                  <div className="ml-4 flex-1">
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <p className="text-sm text-gray-500">Brand: {product.brand}</p>
                    <p className="text-sm text-green-600">
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </p>
                    <div className="flex space-x-4 text-sm text-blue-500 mt-2">
                      <button onClick={() => updateCartItem(product._id, 0)}>Remove</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${product.price.toFixed(2)}</p>
                    <select
                      className="mt-2 border rounded px-2 py-1"
                      value={quantity}
                      onChange={(e) =>
                        updateCartItem(product._id, parseInt(e.target.value))
                      }
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    <p className="mt-2 font-semibold">
                      ${(product.price * quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            )}
            <p className="text-sm font-medium">{cartItems.length} Item{cartItems.length !== 1 ? 's' : ''}</p>
            <p className="text-lg font-semibold">${totalPrice.toFixed(2)}</p>
          </div>

          {/* Right: Summary */}
          <div className="md:w-1/3 w-full">
            <div className="border p-4 rounded">
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
                {cartItems.map(({ product, quantity }) => (
                  <div key={product._id} className="flex justify-between text-sm mb-1">
                    <span>{product.name} x {quantity}</span>
                    <span>${(product.price * quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-lg font-semibold border-t pt-4">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <Link to="/order">
                <button className="w-full bg-yellow-400 text-black py-2 rounded font-semibold mt-6">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;