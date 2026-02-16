import { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on page load
  useEffect(() => {
    const checkLoggedIn = async () => {
      if (localStorage.getItem('token')) {
        setAuthToken(localStorage.getItem('token'));
        try {
          const res = await api.get('/auth/profile');
          setUser(res.data);
          setIsAuthenticated(true);
        } catch (err) {
          localStorage.removeItem('token');
          setAuthToken(null);
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  // Set auth token
  const setAuthToken = (token) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  };

  // Register user
  const register = async (formData) => {
    try {
      setLoading(true);
      const res = await api.post('/auth/register', formData);
      
      setAuthToken(res.data.token);
      setUser(res.data);
      setIsAuthenticated(true);
      setLoading(false);
      setError(null);
      return true;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Registration failed');
      return false;
    }
  };

  // Login user
  const login = async (formData) => {
    try {
      setLoading(true);
      const res = await api.post('/auth/login', formData);
      
      setAuthToken(res.data.token);
      setUser(res.data);
      setIsAuthenticated(true);
      setLoading(false);
      setError(null);
      return true;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Login failed');
      return false;
    }
  };

  // Logout user
  const logout = () => {
    setAuthToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  // Clear errors
  const clearErrors = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
        clearErrors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;