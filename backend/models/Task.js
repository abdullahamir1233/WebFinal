// import mongoose from 'mongoose';

// const taskSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   dueDate: { type: Date, required: true },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to user
// }, { timestamps: true });

// const Task = mongoose.model('Task', taskSchema);
// export default Task;
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, required: true },
  owner: { type: String, required: true }, // Owner is the username of the logged-in user
});

module.exports = mongoose.model('Task', TaskSchema);
