const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  username: { type: String, required: true }, // Associate task with user
});

module.exports = mongoose.model('Task', TaskSchema);
