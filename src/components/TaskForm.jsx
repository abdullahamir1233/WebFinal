import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const TaskForm = () => {
  const [task, setTask] = useState({ name: '', description: '', dueDate: '' });
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // Get the task ID from the URL params
  const navigate = useNavigate(); // Navigate function to redirect after submission
  const token = localStorage.getItem('token'); // Get the token from local storage

  useEffect(() => {
    if (id) {
      // Fetch existing task if we're updating
      const fetchTask = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`/tasks/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setTask(response.data); // Set the fetched task data to the form
        } catch (error) {
          console.error('Error fetching task', error);
        } finally {
          setLoading(false);
        }
      };
      fetchTask();
    }
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        // Update existing task (PUT)
        console.log(id)
        await axios.put(`/tasks/${id}`, task, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Create new task (POST), without passing id
        const { id, ...newTask } = task; // Omit the id field for POST request
        await axios.post('/tasks', newTask, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate('/tasks');
    } catch (error) {
      console.error('Error saving task', error);
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-400 to-indigo-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          {id ? 'Edit Task' : 'Create New Task'}
        </h2>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Task Name</label>
              <input
                id="name"
                type="text"
                value={task.name}
                onChange={(e) => setTask({ ...task, name: e.target.value })}
                placeholder="Enter task name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                id="description"
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
                placeholder="Enter task description"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="dueDate" className="block text-gray-700 font-medium mb-2">Due Date</label>
              <input
                id="dueDate"
                type="date"
                value={task.dueDate}
                onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              {id ? 'Update Task' : 'Create Task'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TaskForm;
