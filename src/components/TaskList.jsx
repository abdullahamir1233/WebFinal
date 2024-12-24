import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.message === 'No tasks found') {
        setMessage(response.data.message);
      } else {
        setTasks(response.data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setMessage('Error fetching tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = () => {
    navigate('/tasks/new'); // Navigate to task form for creating a new task
  };

  const handleUpdateTask = (id) => {
    navigate(`/tasks/form/${id}`); // Navigate to the task form for editing an existing task
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-indigo-500 p-8">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Your Tasks</h2>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {message ? (
              <div className="text-center text-gray-600 mb-4">{message}</div>
            ) : (
              <ul className="space-y-6">
                {tasks.length === 0 ? (
                  <div className="text-center text-gray-600">No tasks found. <button onClick={handleAddTask} className="text-blue-500 underline">Create one</button>.</div>
                ) : (
                  <ul className="space-y-4">
                    {tasks.map(task => (
                      <li key={task._id} className="border p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">{task.name}</h3>
                        <p className="text-sm text-gray-600">{task.description}</p>
                        <p className="text-xs text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                        <button onClick={() => handleUpdateTask(task._id)} className="text-blue-500 underline mt-2">Edit</button>
                      </li>
                    ))}
                  </ul>
                )}
              </ul>
            )}

            <div className="mt-6 text-center">
              <button
                onClick={handleAddTask}
                className="py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none transition duration-300"
              >
                Add New Task
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskList;

