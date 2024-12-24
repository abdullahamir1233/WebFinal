const express = require('express');
const jwt = require('jsonwebtoken');
const Task = require('../models/Task');
const router = express.Router();

const JWT_SECRET = 'your_jwt_secret'; // Replace with a secure secret in production

// Middleware for JWT authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// GET all tasks
router.get('/', authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.find({ username: req.user.username });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a new task
router.post('/', authenticateToken, async (req, res) => {
  const { name, description, dueDate } = req.body;
  const newTask = new Task({ name, description, dueDate, userId: req.user._id });
  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Error saving task' });
  }
});

// PUT (Update) a task
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, description, dueDate } = req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, username: req.user.username },
      { name, description, dueDate },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task' });
  }
});

// DELETE a task
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: id, username: req.user.username });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task' });
  }
});

module.exports = router;
