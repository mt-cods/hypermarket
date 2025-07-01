import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = () => {
  const { isLoggedIn, setShowLoginPopup } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
    }
  }, [isLoggedIn, setShowLoginPopup]);

  // If not logged in, render nothing (or a loading spinner),
  // because the login popup will appear.
  if (!isLoggedIn) {
    return null; // Or you could render a "Please login" message here
  }

  // If logged in, render the protected route's children
  return <Outlet />;
};

export default ProtectedRoute;