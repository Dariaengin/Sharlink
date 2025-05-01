import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Input from './common/Input';
import Button from './common/Button';


// Define backend URL (adjust if your backend runs on a different port/host)
const API_URL = 'http://localhost:2100/api';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    nickname: '', // Changed from username to nickname
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(''); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Frontend validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    if (formData.password.length < 4) {
      setError("Password must be at least 4 characters long.");
      return;
    }
    if (formData.nickname.length < 2 || formData.nickname.length > 20) {
      setError("Nickname must be between 2 and 20 characters.");
      return;
    }
    // Add more frontend validation as needed based on backend model

    setLoading(true);
    try {
      // Prepare data for backend (only nickname, email, password)
      const { nickname, email, password } = formData;
      const signupData = { nickname, email, password };

      // Make API call to backend signup endpoint
      const response = await axios.post(`${API_URL}/signup`, signupData, {
        // Axios sends cookies automatically if backend sets CORS headers correctly
        // If using credentials: withCredentials: true
      });

      console.log('Signup successful:', response.data);
      alert('Signup successful! Please log in.'); // Simple success feedback

      // Redirect to login page after successful signup
      navigate('/login');

    } catch (err) {
      console.error('Signup error:', err);
      // Display error message from backend response if available
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Signup failed. Please try again.'); // Generic error
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>} {/* Display error message */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nickname">
          Nickname
        </label>
        <Input
          type="text"
          name="nickname" // Changed from username
          placeholder="Your Nickname (2-20 characters)"
          value={formData.nickname}
          onChange={handleChange}
          required
          minLength={2}
          maxLength={20}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <Input
          type="email"
          name="email"
          placeholder="your.email@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <Input
          type="password"
          name="password"
          placeholder="****************** (min 4 characters)"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={4}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <Input
          type="password"
          name="confirmPassword"
          placeholder="******************"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <Button type="submit" disabled={loading}> {/* Disable button while loading */}
          {loading ? 'Signing Up...' : 'Sign Up'}
        </Button>
        <Link to="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
          Already have an account? Log In
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;