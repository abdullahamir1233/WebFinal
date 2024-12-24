// import express from 'express';
// import Task from '../models/Task.js';
// import authenticate from '../middleware/authenticate.js'; // Use your JWT middleware

// const router = express.Router();

// // Get all tasks for the logged-in user
// router.get('/', authenticate, async (req, res) => {
//   try {
//     const tasks = await Task.find({ userId: req.user.id });
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Create a new task
// router.post('/', authenticate, async (req, res) => {
//   try {
//     const { name, description, dueDate } = req.body;
//     const task = new Task({ name, description, dueDate, userId: req.user.id });
//     await task.save();
//     res.status(201).json(task);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Update a task
// router.put('/:id', authenticate, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, description, dueDate } = req.body;

//     const task = await Task.findOneAndUpdate(
//       { _id: id, userId: req.user.id },
//       { name, description, dueDate },
//       { new: true }
//     );

//     if (!task) return res.status(404).json({ message: 'Task not found' });

//     res.json(task);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Delete a task
// router.delete('/:id', authenticate, async (req, res) => {
//   try {
//     const { id } = req.params;

//     const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id });
//     if (!task) return res.status(404).json({ message: 'Task not found' });

//     res.json({ message: 'Task deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;
const express = require('express');
const jwt = require('jsonwebtoken');
const Task = require('../models/Task');
const router = express.Router();

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token required');

  jwt.verify(token, 'secretkey', (err, user) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = user; // Attach user info to request
    next();
  });
};

// Get Tasks
router.get('/', verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user.username });
    res.json(tasks);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create Task
router.post('/', verifyToken, async (req, res) => {
  const { name, description, dueDate } = req.body;

  const task = new Task({
    name,
    description,
    dueDate,
    owner: req.user.username, // Assign task to logged-in user
  });

  try {
    const savedTask = await task.save();
    res.json(savedTask);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Task
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
