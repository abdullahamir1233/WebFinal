const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = 'your_jwt_secret'; // Replace with a secure secret in production

// Hardcoded credentials
const USER = { username: 'admin', password: 'admin123' };

// Login Route
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    // Generate JWT (optional)
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
