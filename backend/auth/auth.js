import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Register
router.post("/signup", async (req, res) => {
  try {
    const { nickname, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ error: "Email already registered" });

    const user = new User({ nickname, email, password });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ error: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      token,
      user: { id: user._id, nickname: user.nickname, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
