import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from './common/Input';
import Button from './common/Button';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', formData);
    // Mock API call simulation
    alert('Login successful!');
    // Redirect or update UI state after successful login
  };
 