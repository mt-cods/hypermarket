import React, { useState } from 'react';
import axios from 'axios';

import { API_URL, categories } from './config.js';

const AddProduct = () => {
  const [form, setForm] = useState({
    name: '',
    brand: '',
    price: '',
    image: null, // file
    inStock: true,
    description: '',
    category: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setForm((prev) => ({
        ...prev,
        [name]: files[0], // take first selected file
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create FormData object
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('brand', form.brand);
      formData.append('price', form.price);
      formData.append('inStock', form.inStock);
      formData.append('description', form.description);
      formData.append('category', form.category);
      if (form.image) {
        formData.append('image', form.image);
      }

      const response = await axios.post(`${API_URL}/api/products`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201 || response.status === 200) {
        alert('✅ Product added successfully!');
        setForm({
          name: '',
          brand: '',
          price: '',
          image: null,
          inStock: true,
          description: '',
          category: '',
        });
      } else {
        alert('❌ Failed to add product');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Server error');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block font-medium mb-1">Brand</label>
          <input
            type="text"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            min="0"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium mb-2">Upload Product Image</label>

          <div
            className="flex items-center justify-center w-full h-40 border-2 border-dashed border-blue-400 rounded-md cursor-pointer
                       hover:border-blue-600 transition relative"
            onClick={() => document.getElementById('imageUpload').click()}
          >
            {form.image ? (
              <img
                src={URL.createObjectURL(form.image)}
                alt="Preview"
                className="object-contain max-h-full max-w-full"
              />
            ) : (
              <p className="text-blue-400 font-semibold">Click or drag file to upload</p>
            )}
            <input
              type="file"
              id="imageUpload"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </div>
        </div>

        {/* In Stock */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="inStock"
            checked={form.inStock}
            onChange={handleChange}
            className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="text-gray-700">In Stock</label>
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>


        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;