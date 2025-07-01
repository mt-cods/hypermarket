import React, { useEffect } from 'react';
import { useAuth } from './AuthContext';
import LoginPopup from './LoginPopup';
import { setAuthInterceptorHandlers } from './axiosInstance'; // your axios setup

const LoginWrapper = () => {
  const {
    showLoginPopup,
    setShowLoginPopup,
    showRegisterPopup,
    setShowRegisterPopup,
    handleLogin,
    handleRegister,
    loading,
    error,
    setError,
  } = useAuth();

  useEffect(() => {
    setAuthInterceptorHandlers({
      triggerLogin: () => setShowLoginPopup(true),
    });
  }, [setShowLoginPopup]);

  const isOpen = showLoginPopup || showRegisterPopup;

  const handleClose = () => {
    setShowLoginPopup(false);
    setShowRegisterPopup(false);
    setError('');
  };

  return isOpen ? (
    <LoginPopup
      onClose={handleClose}
      onLogin={handleLogin}
      onRegister={handleRegister}
      loading={loading}
      error={error}
    />
  ) : null;
};

export default LoginWrapper;
