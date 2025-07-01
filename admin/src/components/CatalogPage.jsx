import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

import { API_URL } from './config.js';

const CatalogPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/api/products/${id}`);
      setProducts((prev) => prev.filter((product) => product._id !== id));
      alert('Deleted the product');
    } catch (err) {
      alert('Error deleting product');
    }
  };

  return (
    <div className="w-full mx-auto mt-10 p-6 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-8 text-indigo-700 drop-shadow-md">
        Product Catalog
      </h1>

      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading products...</p>
      ) : (
        <>
          {/* Table View for larger screens */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full table-fixed border-separate border-spacing-y-5">
              <thead>
                <tr className="bg-indigo-200 text-indigo-900 text-left rounded-lg shadow-inner">
                  <th className="px-6 py-3 rounded-tl-lg">Image</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Brand</th>
                  <th className="px-6 py-3">Price ($)</th>
                  <th className="px-6 py-3">In Stock</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3 rounded-tr-lg text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="bg-white shadow-lg rounded-xl hover:shadow-2xl transition-shadow cursor-pointer"
                  >
                    <td className="px-6 py-4 align-middle">
                      <img
                        src={API_URL + product.image}
                        alt={product.name}
                        className="h-14 w-14 object-cover rounded-lg border-2 border-indigo-300"
                      />
                    </td>
                    <td className="px-6 py-4 align-middle font-semibold text-indigo-700">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 align-middle text-indigo-600">
                      {product.brand}
                    </td>
                    <td className="px-6 py-4 align-middle font-medium text-purple-700">
                      ₹{product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 align-middle">
                      {product.inStock ? (
                        <span className="text-green-700 font-semibold bg-green-100 px-2 py-1 rounded-full shadow-sm">
                          Yes
                        </span>
                      ) : (
                        <span className="text-red-700 font-semibold bg-red-100 px-2 py-1 rounded-full shadow-sm">
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 align-middle text-purple-600 italic">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 align-middle text-center">
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Delete Product"
                      >
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View for smaller screens */}
          <div className="block sm:hidden mt-10">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-lg rounded-xl mb-6 p-6 flex flex-col sm:flex-row sm:items-center hover:shadow-2xl transition-shadow"
              >
                <img
                  src={API_URL + product.image}
                  alt={product.name}
                  className="h-20 w-20 object-cover rounded-lg border-2 border-indigo-300 mb-4 sm:mb-0 sm:mr-6"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-indigo-700">{product.name}</h2>
                  <p className="text-indigo-600">{product.brand}</p>
                  <p className="text-purple-700">₹{product.price.toFixed(2)}</p>
                  <p className={`font-semibold ${product.inStock ? 'text-green-700' : 'text-red-700'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </p>
                  <p className="italic text-purple-600">{product.category}</p>
                </div>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-600 hover:text-red-800 mt-4 sm:mt-0 sm:ml-4"
                  title="Delete Product"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CatalogPage;
