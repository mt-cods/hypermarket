import React from 'react';
import { AuthProvider } from './components/AuthContext';
import LoginWrapper from './components/LoginWrapper';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';

import ProtectedRoute from './components/ProtectedRoute.jsx';

import './App.css';
import OrdersPage from './pages/OrdersPage.jsx';
import OrderPage from './pages/OrderPage.jsx';

import { motion } from 'framer-motion';

const FadeIn = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: false, amount: 0.2 }}
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <FadeIn>
      <AuthProvider>
        <LoginWrapper />
        <div className='flex flex-col pt-19'>
          <Router>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/category/:categorySlug" element={<CategoryPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route path="/order" element={<OrderPage />} />
                </Route>
              </Route>
            </Routes>
          </Router>
        </div>
      </AuthProvider>
    </FadeIn>
  );
}

export default App;
