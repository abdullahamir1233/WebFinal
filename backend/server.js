const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/taskapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch(err => console.error(err));

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));