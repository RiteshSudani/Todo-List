// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../redux/authSlice';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Render the component if authenticated, otherwise navigate to login
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
