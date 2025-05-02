import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
import { useAuth } from '../../context/AuthContext';
import Input from './common/Input';
import Button from './common/Button';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate(); // Hook for navigation
  const { login } = useAuth(); // Get login function from context

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true);

    try {
      // Call login function from AuthContext
      const result = await login(formData.email, formData.password);

      if (result.success) {
        console.log("Login successful:", result.user);
        alert("Login successful!"); // Simple success feedback
        // Redirect to a placeholder dashboard or home page after successful login
        // navigate('/dashboard'); // Replace with actual dashboard route later
        navigate("/"); // Redirecting to root for now
      } else {
        setError(result.error || "Login failed. Please check credentials.");
      }
    } catch (err) {
      // This catch block might be less likely to be hit if AuthContext handles errors
      console.error("Login component error:", err);
      setError("An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}{" "}
      {/* Display error message */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
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
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <Input
          type="password"
          name="password"
          placeholder="******************"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <Button type="submit" disabled={loading}>
          {" "}
          {/* Disable button while loading */}
          {loading ? "Logging In..." : "Log In"}
        </Button>
        <Link
          to="/signup"
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        >
          Don't have an account? Sign Up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
