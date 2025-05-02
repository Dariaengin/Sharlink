import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Need to install js-cookie

const API_URL = 'http://localhost:2100/api';

// Create Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // To check initial auth status

  // Check initial authentication status based on cookies
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = Cookies.get('authToken');
      const userInfoCookie = Cookies.get('userInfo');

      if (token && userInfoCookie) {
        try {
          const userInfo = JSON.parse(userInfoCookie); // Already stringified by backend
          setUser(userInfo);
          setIsAuthenticated(true);
        } catch (e) {
          console.error("Error parsing user info cookie:", e);
          // Clear cookies if parsing fails
          Cookies.remove('authToken');
          Cookies.remove('userInfo');
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    };
    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password }, {
        // Assuming backend CORS allows credentials or is same-origin
        // withCredentials: true, // Axios might handle cookies automatically
      });
      // Backend sets httpOnly authToken cookie and regular userInfo cookie
      const userInfoCookie = Cookies.get('userInfo'); // Read the cookie set by backend
      if (userInfoCookie) {
        const userInfo = JSON.parse(userInfoCookie);
        setUser(userInfo);
        setIsAuthenticated(true);
        return { success: true, user: userInfo };
      } else {
        // Fallback if cookie reading fails immediately
        setUser(response.data.user);
        setIsAuthenticated(true);
        return { success: true, user: response.data.user };
      }
    } catch (error) {
      console.error('Login failed:', error);
      setIsAuthenticated(false);
      setUser(null);
      // Return error message from backend if available
      const errorMessage = error.response?.data?.error || 'Login failed. Please check credentials.';
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.get(`${API_URL}/logout`, {
        // withCredentials: true, // If needed
      });
      // Backend should clear cookies, but we clear them client-side too
      Cookies.remove('authToken');
      Cookies.remove('userInfo');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
      // Still log out client-side even if server call fails
      Cookies.remove('authToken');
      Cookies.remove('userInfo');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Signup function (optional here, could be handled directly in SignUpForm)
  // const signup = async (nickname, email, password) => { ... };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};

