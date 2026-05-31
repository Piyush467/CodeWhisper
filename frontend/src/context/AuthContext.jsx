import React, { createContext, useState, useEffect } from 'react';
import { authApi } from '../api/authApi';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Run automatic JWT validation check on initial load
  useEffect(() => {
    const verifyUserSession = async () => {
      try {
        const data = await authApi.me();
        if (data && data.success) {
          setUser(data.user);
        }
      } catch (err) {
        // Ignored. User is simply unauthenticated on start
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyUserSession();
  }, []);

  /**
   * Logs in a user.
   */
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authApi.login(email, password);
      if (data && data.success) {
        setUser(data.user);
        return data;
      }
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Failed to authenticate user.';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Registers a new user.
   */
  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authApi.register(name, email, password);
      if (data && data.success) {
        setUser(data.user);
        return data;
      }
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Registration failed.';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logs out user.
   */
  const logout = async () => {
    setLoading(true);
    try {
      await authApi.logout();
      setUser(null);
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        setError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
