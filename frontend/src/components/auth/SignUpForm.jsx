import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword)
      return setMessage("Passwords do not match.");

    try {
      await axios.post("http://localhost:2100/api/signup", formData);
      setMessage("Registration successful!");
      navigate("/login");
    } catch (err) {
      setMessage(err.response?.data?.error || "Sign up failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        name="nickname"
        type="text"
        placeholder="Nickname"
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        onChange={handleChange}
        required
      />
      <button type="submit">Sign Up</button>
      <p>{message}</p>
    </form>
  );
}
