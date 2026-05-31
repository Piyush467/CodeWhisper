import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loader from '../components/common/Loader';
import ProtectedRoute from './ProtectedRoute';

// Import pages
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import ReviewDetail from '../pages/ReviewDetail';
import NotFound from '../pages/NotFound';

export const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader fullScreen message="Setting up review framework..." />;
  }

  return (
    <Routes>
      {/* Public Guest Routes (Redirects to dashboard '/' if already authenticated) */}
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" replace /> : <Register />}
      />

      {/* Secure Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/review/:id" element={<ReviewDetail />} />
      </Route>

      {/* Fallback 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
