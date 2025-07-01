import React from 'react';
import { FaStar, FaShoppingCart, FaBoxOpen, FaLeaf } from 'react-icons/fa';

const ProductDetailPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Product Image */}
        <div className="w-full md:w-1/2">
          <img
            src="https://via.placeholder.com/500x500.png?text=Organic+Apples"
            alt="Organic Apples"
            className="rounded-lg shadow-md w-full h-auto object-cover"
          />
        </div>

        {/* Right: Product Info */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Organic Apples - 1kg</h1>
          <div className="flex items-center text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
            <span className="text-sm text-gray-600 ml-2">(85 reviews)</span>
          </div>

          <p className="text-gray-700">
            Fresh, crispy organic apples sourced from certified Himalayan orchards. Sweet, juicy, and perfect for a healthy snack or
            salad ingredient.
          </p>

          <div className="text-2xl font-semibold text-green-600">₹180</div>

          {/* Extra Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <FaLeaf className="text-green-500" />
              <span>100% Organic</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBoxOpen className="text-blue-500" />
              <span>Packed fresh daily</span>
            </div>
            <div className="flex items-center gap-2">
              <FaLeaf className="text-green-500" />
              <span>No preservatives</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBoxOpen className="text-blue-500" />
              <span>Next-day delivery</span>
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex border border-gray-300 rounded overflow-hidden">
              <button className="px-3 py-1 font-bold text-gray-700">-</button>
              <span className="px-4 py-1">1</span>
              <button className="px-3 py-1 font-bold text-gray-700">+</button>
            </div>
            <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded shadow">
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Description</h2>
        <p className="text-gray-700 leading-relaxed">
          These apples are handpicked from certified organic farms without the use of synthetic pesticides or chemicals. They're rich
          in fiber, antioxidants, and vitamins A and C. Store in a cool, dry place or refrigerate for extended freshness. Ideal for
          direct consumption, juicing, or cooking.
        </p>
      </div>
    </div>
  );
};

export default ProductDetailPage;