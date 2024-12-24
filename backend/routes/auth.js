// // import express from 'express';
// // import jwt from 'jsonwebtoken';
// // import User from '../models/User.js';
// // import dotenv from 'dotenv';

// // dotenv.config();
// // const router = express.Router();

// // // Register
// // router.post('/register', async (req, res) => {
// //   try {
// //     const { username, email, password } = req.body;

// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) return res.status(400).json({ message: 'User already exists' });

// //     const user = new User({ username, email, password });
// //     await user.save();

// //     res.status(201).json({ message: 'User registered successfully' });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // Login
// // router.post('/login', async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     const user = await User.findOne({ email });
// //     if (!user) return res.status(404).json({ message: 'User not found' });

// //     const isPasswordValid = await user.comparePassword(password);
// //     if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

// //     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
// //     res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // export default router;

// import express from 'express';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';
// import dotenv from 'dotenv';

// dotenv.config();
// const router = express.Router();

// // Login
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Debugging: Log incoming data
//     console.log('Login Request Body:', req.body);

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log('User not found');
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Validate password
//     const isPasswordValid = await user.comparePassword(password);
//     if (!isPasswordValid) {
//       console.log('Invalid password');
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Create and return token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });
//   } catch (err) {
//     console.error('Error in /login:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Hardcoded credentials
const USER = { username: 'admin', password: 'admin123' };

// Login Route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === USER.username && password === USER.password) {
    // Generate a JWT token
    const token = jwt.sign({ username }, 'secretkey', { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
