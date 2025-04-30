const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Sign up or add new user in the DB
const signUp = async (req, res) => {
  try {
    const { nickname, email, password } = req.body;

    // Input validation
    if (!nickname || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = new User({
      nickname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Create JWT token
    const token = jwt.sign(
      { userId: newUser._id, nickname: newUser.nickname },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Set token in HttpOnly cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      sameSite: 'Lax',
      //   maxAge: 0 * 24 * 60 * 60 * 1000, // 1 day optionally
    });

    // Return user data
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser._id,
        nickname: newUser.nickname,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { signUp };
