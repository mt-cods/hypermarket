import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../components/axiosInstance.js';
import { categories, categories_url_slug, API_URL } from "./config.js";

import ProductGrid from '../components/ProductGrid.jsx';

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter and sort state
  const [sortBy, setSortBy] = useState("popularity");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  const getCategoryNameFromSlug = (slug) => {
    return Object.entries(categories_url_slug).find(
      ([_, value]) => value === slug
    )?.[0];
  };

  useEffect(() => {
    const categoryName = getCategoryNameFromSlug(categorySlug);
    if (!categoryName) {
      setError("Invalid category");
      setLoading(false);
      return;
    }

    setSelectedCategory(categoryName);
    fetchProducts(categorySlug);
  }, [categorySlug]);

  useEffect(() => {
    // Filter and sort when products change
    applyFiltersAndSort();
  }, [products, sortBy, minPrice, maxPrice, inStockOnly]);

  const fetchProducts = async (slug) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get(`${API_URL}/api/products/category/${slug}`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching category products:", err.message);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...products];

    // Price filter
    if (minPrice !== "") {
      filtered = filtered.filter(product => product.price >= parseFloat(minPrice));
    }
    if (maxPrice !== "") {
      filtered = filtered.filter(product => product.price <= parseFloat(maxPrice));
    }

    // In Stock filter
    if (inStockOnly) {
      filtered = filtered.filter(product => product.inStock === true);
    }

    // Sorting
    switch (sortBy) {
      case "low-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "popularity":
      default:
        filtered.sort((a, b) => b.popularity - a.popularity); // assuming popularity score
        break;
    }

    setFilteredProducts(filtered);
  };

  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleCategoryChange = (e) => {
    const newCategoryName = e.target.value;
    const newSlug = categories_url_slug[newCategoryName];
    setSelectedCategory(newCategoryName);
    navigate(`/category/${newSlug}`);
  };

  return (
    <div className="flex flex-col md:flex-row mx-auto gap-6 mt-4 px-4">
      <FilterSidebar
        sortBy={sortBy}
        setSortBy={setSortBy}
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        inStockOnly={inStockOnly}
        setInStockOnly={setInStockOnly}
      />

      <div className="flex-1">
        {/* Category Dropdown */}
        <div className="mb-6">
          <label className="block text-base font-semibold text-gray-700 mb-2">Choose Category</label>
          <select
            className="border border-gray-300 rounded px-5 py-3 text-base focus:ring-2 focus:ring-teal-500 focus:outline-none"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Product Grid */}
        {loading ? (
          <p className="text-center mt-8">Loading products...</p>
        ) : error ? (
          <p className="text-center mt-8 text-red-600">{error}</p>
        ) : (
          <ProductGrid products={filteredProducts} API_URL={API_URL} />
        )}
      </div>
    </div>
  );
};

const FilterSidebar = ({
  sortBy,
  setSortBy,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  inStockOnly,
  setInStockOnly
}) => {
  return (
    <aside className="w-full md:w-72 p-4 md:p-6 bg-white rounded-md shadow-md md:sticky md:top-24 md:h-[calc(100vh-6rem)] mb-4 md:mb-0">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      {/* Sort By */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
        >
          <option value="popularity">Most Popular</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Price Range</h3>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-1/2 p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-1/2 p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Availability</h3>
        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="form-checkbox"
          />
          <span>In Stock Only</span>
        </label>
      </div>
    </aside>
  );
};

export default CategoryPage;