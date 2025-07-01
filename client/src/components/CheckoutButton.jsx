import React from 'react';
import axios from 'axios';
import { useStripe } from '@stripe/react-stripe-js';

function CheckoutButton() {
  const stripe = useStripe();

  const handleCheckout = async () => {
    const items = [
      {
        name: 'Sample Product',
        quantity: 1,
        price: 1999, // $19.99 in cents
      },
    ];

    try {
      const response = await axios.post('http://localhost:5000/create-checkout-session', { items });
      const session = response.data;

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <button
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      onClick={handleCheckout}
    >
      Checkout
    </button>
  );
}

export default CheckoutButton;