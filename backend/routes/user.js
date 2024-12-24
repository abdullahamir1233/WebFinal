import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to authenticate token
const authenticate = (req, res, next) => {
  const token = req.headers['x-auth-token'];
  if (!token) return res.status(403).json({ message: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach user info to request
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get all users (Protected route)
router.get('/', authenticate, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user by ID (Protected route)
router.get('/:id', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (req.user.id !== user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user (Protected route)
router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  // Ensure the user can only update their own data
  if (req.user.id !== id && !req.user.isAdmin) {
    return res.status(403).json({ message: 'You can only update your own data' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { username, email }, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user (Protected route)
router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  // Ensure the user can only delete their own account
  if (req.user.id !== id && !req.user.isAdmin) {
    return res.status(403).json({ message: 'You can only delete your own account' });
  }

  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
