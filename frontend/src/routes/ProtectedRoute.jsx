import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loader from '../components/common/Loader';

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader fullScreen message="Confirming authorization credentials..." />;
  }

  // Redirect to sign-in page if user session is absent
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Output nested route children if verified
  return <Outlet />;
};

export default ProtectedRoute;
