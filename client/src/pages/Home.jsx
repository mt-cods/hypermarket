import React, { useEffect, useState } from "react";
import axiosInstance from '../components/axiosInstance.js';
import HeroSection from '../components/HeroSection';
import ProductRow from '../components/ProductRow';
import CategoryRow from '../components/CategoryRow';

import { API_URL, categories, categories_url_slug } from "./config.js";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get(`${API_URL}/api/products`);
                const shuffled = [...response.data].sort(() => 0.5 - Math.random());
                const randomProducts = shuffled.slice(0, 12);
                setProducts(randomProducts);
            } catch (err) {
                console.error(err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <HeroSection />
            <CategoryRow categories={categories} categories_url_slug={categories_url_slug} API_URL={API_URL} />

            {loading ? (
                <p className="text-center mt-8">Loading products...</p>
            ) : error ? (
                <p className="text-center mt-8 text-red-600">Error: {error}</p>
            ) : (
                <ProductRow heading={"Top picks"} products={products} API_URL={API_URL}/>
            )}
        </div>
    );
}

export default Home;