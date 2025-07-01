import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import LoginPopup from './LoginPopup';

// ProtectedRoute will check if the user is authenticated
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace with real authentication check

  // Simulating a check for authentication (you might want to use a token or a global state)
  const checkAuthentication = () => {
    // For now, it's hardcoded, but you can check localStorage or a global state
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
    }
  };

  // When the component mounts, check for authentication
  React.useEffect(() => {
    checkAuthentication();
  }, []);

  if (isAuthenticated) {
    return children; // If authenticated, render the children (protected routes)
  } else {
    return <LoginPopup />; // Otherwise, show the LoginPopup
  }
};

export default ProtectedRoute;
