import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from './common/Input';


const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation 
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log('Signing up with:', formData);
    // Mock API call simulation
    alert('Signup successful!');
    // Redirect or update UI state after successful signup
  };