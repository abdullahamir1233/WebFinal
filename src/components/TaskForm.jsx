// import React, { useState } from 'react';
// import API from '../services/api';

// const TaskForm = ({ task, onSubmit }) => {
//   const [formData, setFormData] = useState(task || { name: '', description: '', dueDate: '' });

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (task) {
//       await API.put(`/tasks/${task._id}`, formData);
//     } else {
//       await API.post('/tasks', formData);
//     }
//     onSubmit();
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="name" value={formData.name} onChange={handleChange} placeholder="Task Name" required />
//       <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
//       <input name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} required />
//       <button type="submit">{task ? 'Update' : 'Create'} Task</button>
//     </form>
//   );
// };

// export default TaskForm;

import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        'http://localhost:5000/tasks',
        { name, description, dueDate },
        { headers: { Authorization: token } }
      );
      setName('');
      setDescription('');
      setDueDate('');
      onTaskCreated();
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Task Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label>Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
