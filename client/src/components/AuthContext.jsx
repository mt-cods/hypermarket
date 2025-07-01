import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../pages/config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async ({ username, password }) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { username, password });
      const accessToken = response.data.accessToken;

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        setIsLoggedIn(true);
        setShowLoginPopup(false);
      } else {
        setError('Login failed: No access token returned');
      }
    } catch (err) {
      setError('Login failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_URL}/auth/register`, { username, email, password });
      if (response.status === 201) {
        setShowRegisterPopup(false);
        setShowLoginPopup(true); // Show login popup after successful register
      } else {
        setError('Registration failed');
      }
    } catch (err) {
      setError('Registration failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        showLoginPopup,
        setShowLoginPopup,
        showRegisterPopup,
        setShowRegisterPopup,
        handleLogin,
        handleRegister,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);