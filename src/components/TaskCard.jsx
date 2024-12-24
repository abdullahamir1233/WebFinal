// import React from 'react';

// const TaskCard = ({ task, onEdit, onDelete }) => {
//   return (
//     <div className="bg-white p-4 rounded shadow-md mb-4">
//       <h3 className="text-lg font-bold">{task.name}</h3>
//       <p className="text-gray-600">{task.description}</p>
//       <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
//       <div className="mt-4 flex space-x-2">
//         <button
//           onClick={() => onEdit(task)}
//           className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
//         >
//           Edit
//         </button>
//         <button
//           onClick={() => onDelete(task._id)}
//           className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TaskCard;

import React from 'react';
import axios from 'axios';

const TaskCard = ({ task, onTaskUpdated }) => {
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/tasks/${task._id}`, {
        headers: { Authorization: token },
      });
      onTaskUpdated();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div style={{ border: '1px solid gray', padding: '10px', marginBottom: '10px' }}>
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TaskCard;
