// // import React, { useState, useEffect } from 'react';
// // import API from '../services/api';

// // const TaskList = () => {
// //   const [tasks, setTasks] = useState([]);

// //   const fetchTasks = async () => {
// //     const { data } = await API.get('/tasks');
// //     setTasks(data);
// //   };

// //   useEffect(() => {
// //     fetchTasks();
// //   }, []);

// //   return (
// //     <div>
// //       <h1>Your Tasks</h1>
// //       {tasks.map((task) => (
// //         <div key={task._id}>
// //           <h2>{task.name}</h2>
// //           <p>{task.description}</p>
// //           <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default TaskList;
// import React from 'react';
// import TaskCard from './TaskCard';

// const TaskList = ({ tasks, onEdit, onDelete }) => {
//   if (tasks.length === 0) {
//     return <p className="text-gray-500">No tasks available. Add some tasks to get started!</p>;
//   }

//   return (
//     <div>
//       {tasks.map((task) => (
//         <TaskCard
//           key={task._id}
//           task={task}
//           onEdit={onEdit}
//           onDelete={onDelete}
//         />
//       ))}
//     </div>
//   );
// };

// export default TaskList;
import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onTaskUpdated }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onTaskUpdated={onTaskUpdated} />
      ))}
    </div>
  );
};

export default TaskList;

