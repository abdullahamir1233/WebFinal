const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // If you want to hash passwords
const router = express.Router();

// Hardcoded credentials for now (or connect to a user database)
const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123', // Ideally, you would hash the password in a real app
  },
];

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Check password (for hardcoded credentials, use the plain text comparison)
  if (user.password !== password) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY || 'mysecretkey', { expiresIn: '1h' });
  
  // Send the token to the client
  res.json({ token });
});

module.exports = router;
