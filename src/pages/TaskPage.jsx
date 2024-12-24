// // import React, { useState, useEffect } from 'react';
// // import TaskList from '../components/TaskList';
// // import TaskForm from '../components/TaskForm';
// // import API from '../services/api';

// // const TaskPage = () => {
// //   const [tasks, setTasks] = useState([]);
// //   const [editingTask, setEditingTask] = useState(null);

// //   const fetchTasks = async () => {
// //     const { data } = await API.get('/tasks');
// //     setTasks(data);
// //   };

// //   const handleCreateOrUpdate = async () => {
// //     setEditingTask(null);
// //     await fetchTasks();
// //   };

// //   const handleEdit = (task) => {
// //     setEditingTask(task);
// //   };

// //   const handleDelete = async (taskId) => {
// //     await API.delete(`/tasks/${taskId}`);
// //     await fetchTasks();
// //   };

// //   useEffect(() => {
// //     fetchTasks();
// //   }, []);

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-2xl font-bold mb-6">Task Manager</h1>
// //       <TaskForm task={editingTask} onSubmit={handleCreateOrUpdate} />
// //       <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
// //     </div>
// //   );
// // };

// // export default TaskPage;
// import React, { useState } from 'react';
// import TaskList from '../components/TaskList';
// import TaskForm from '../components/TaskForm';
// const TaskPage = () => {
//   const [taskTitle, setTaskTitle] = useState('');
//   const [taskDescription, setTaskDescription] = useState('');
//   const [tasks, setTasks] = useState([]);

//   const handleAddTask = async () => {
//     if (!taskTitle || !taskDescription) {
//       alert('Please fill in all fields');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:5000/api/tasks', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you're storing the token in localStorage
//         },
//         body: JSON.stringify({
//           title: taskTitle,
//           description: taskDescription,
//         }),
//       });

//       if (!response.ok) {
//         const data = await response.json();
//         throw new Error(data.message || 'Failed to add task');
//       }

//       const newTask = await response.json();
//       setTasks([...tasks, newTask]); // Update the tasks state
//       setTaskTitle(''); // Clear the title input
//       setTaskDescription(''); // Clear the description input
//       alert('Task added successfully!');
//     } catch (error) {
//       console.error('Error adding task:', error.message);
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Tasks</h1>
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Task Title"
//           value={taskTitle}
//           onChange={(e) => setTaskTitle(e.target.value)}
//           className="border p-2 mb-2 w-full"
//         />
//         <textarea
//           placeholder="Task Description"
//           value={taskDescription}
//           onChange={(e) => setTaskDescription(e.target.value)}
//           className="border p-2 mb-2 w-full"
//         />
//         <button
//           onClick={handleAddTask}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Add Task
//         </button>
//       </div>
//       <ul>
//         {tasks.map((task, index) => (
//           <li key={index} className="border p-2 mb-2">
//             <h3 className="font-bold">{task.title}</h3>
//             <p>{task.description}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TaskPage;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/tasks', {
          headers: { Authorization: token },
        });
        setTasks(response.data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };

    fetchTasks();
  }, [refresh]);

  return (
    <div>
      <h2>Your Tasks</h2>
      <TaskForm onTaskCreated={() => setRefresh(!refresh)} />
      <TaskList tasks={tasks} onTaskUpdated={() => setRefresh(!refresh)} />
    </div>
  );
};

export default TaskPage;
