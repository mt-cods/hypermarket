import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance.js';

const ProductRow = ({ heading, products, API_URL }) => {
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const initialQuantities = {};
    products.forEach(product => {
      initialQuantities[product._id] = 1;
    });
    setQuantities(initialQuantities);
  }, [products]);

  const handleIncrease = (productId) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: prev[productId] + 1
    }));
  };

  const handleDecrease = (productId) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, prev[productId] - 1)
    }));
  };

  const handleAddToCart = async (product, quantity) => {
    try {
      const response = await axiosInstance.post(
        `${API_URL}/api/cart/update`,
        {
          items: [{ productId: product._id, quantity }]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        }
      );

      console.log('Cart updated:', response.data.cart);
      alert("added to cart");
    } catch (error) {
      if (error.response) {
        console.error('Failed to update cart:', error.response.data.message);
      } else {
        console.error('Error updating cart:', error.message);
      }
    }
  };

  return (
    <section className="w-[90%] mx-auto mt-4">
      <h2 className="text-2xl font-semibold mb-6 text-[#0c6c6e]">{heading}</h2>
      <div className="flex overflow-x-auto items-stretch space-x-6 pb-4 hide-scrollbar">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex-shrink-0 w-64 bg-white rounded shadow flex flex-col"
          >
            <div className="h-40 w-full flex items-center justify-center p-2">
              <img
                src={API_URL + product.image}
                alt={product.name}
                className="max-h-full object-contain"
                loading="lazy"
              />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-md font-medium text-gray-900 mt-1">₹{product.price}</p>
              <span
                className={`text-xs px-2 py-1 rounded-full w-fit mt-2 ${
                  product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>

              {product.inStock && (
                <>
                  <div className="mt-4 flex items-center space-x-2">
                    <button
                      className="px-3 py-1 bg-gray-200 rounded"
                      onClick={() => handleDecrease(product._id)}
                    >
                      −
                    </button>
                    <span className="min-w-[20px] text-center">
                      {quantities[product._id]}
                    </span>
                    <button
                      className="px-3 py-1 bg-gray-200 rounded"
                      onClick={() => handleIncrease(product._id)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    onClick={() => handleAddToCart(product, quantities[product._id])}
                  >
                    Add to Cart
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductRow;
