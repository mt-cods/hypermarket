import React, { useEffect, useState } from 'react';
import axiosInstance from '../components/axiosInstance';
import { loadStripe } from '@stripe/stripe-js';
import { API_URL, STRIPE_PK } from './config';

const stripePromise = loadStripe(STRIPE_PK);

const OrderPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState({
    fullName: '', phone: '', street: '', city: '', state: '', postalCode: '', country: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cartError, setCartError] = useState('');

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await axiosInstance.get(`${API_URL}/api/cart`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
        });
        const entries = Object.entries(res.data.cart);
        const products = await Promise.all(entries.map(async ([pid, qty]) => {
          const p = await axiosInstance.get(`${API_URL}/api/products/${pid}`);
          return { product: p.data, quantity: qty };
        }));
        setCartItems(products);
      } catch (e) {
        setCartError('Failed to load cart');
      }
    }
    fetchCart();
  }, []);

  const totalAmount = cartItems.reduce((sum, { product, quantity }) =>
    sum + product.price * quantity, 0);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    const missing = Object.entries(address).filter(([, v]) => !v);
    if (missing.length) {
      setError('Please fill all address fields');
      return;
    }
    if (cartItems.length === 0) {
      setCartError('Your cart is empty');
      return;
    }

    setLoading(true);
    try {
      const items = cartItems.map(({ product, quantity }) => ({
        productId: product._id,
        quantity,
      }));

      const resp = await axiosInstance.post(`${API_URL}/api/order`, {
        items, shippingAddress: address
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      });

      const stripe = await stripePromise;
      const { sessionId } = resp.data;
      await stripe.redirectToCheckout({ sessionId });

    } catch (e) {
      console.error(e);
      setError('Checkout failed. Please try again.');
    }
    setLoading(false);
  };


  const autofillAddress = () => {
    setAddress({
      fullName: 'John Doe',
      phone: '9876543210',
      street: '221B Baker Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400001',
      country: 'India',
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Place Your Order</h1>
      {cartError && <p className="text-red-600 mb-4">{cartError}</p>}

      <section className="mb-6">
        <h2 className="font-semibold mb-2">Shipping Address</h2>
        <div className="space-y-2">
          {['fullName', 'phone', 'street', 'city', 'state', 'postalCode', 'country'].map(field => (
            <input
              key={field}
              name={field}
              value={address[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="w-full border px-3 py-2 rounded"
            />
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">Order Summary</h2>
        <div className="space-y-2">
          {cartItems.map(({ product, quantity }) => (
            <div key={product._id} className="flex justify-between">
              <span>{product.name} x {quantity}</span>
              <span>₹{(product.price * quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </section>

      {error && <p className="text-red-600">{error}</p>}

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded"
      >
        {loading ? 'Processing...' : `Pay ₹${totalAmount.toFixed(2)}`}
      </button>
      <button
        onClick={autofillAddress}
        className="w-full mt-2 bg-gray-200 text-black py-2 rounded text-sm hover:bg-gray-300"
      >
        Autofill for Dev
      </button>
    </div>
  );
};

export default OrderPage;