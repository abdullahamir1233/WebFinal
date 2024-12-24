import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the JWT token
        localStorage.setItem('token', data.token);
        navigate('/tasks');  // Redirect to tasks page after successful login
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Error logging in. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Login</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-700 font-medium mb-1">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out"
          >
            Log In
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Forgot your password? <a href="/reset" className="text-blue-500 hover:underline">Reset here</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
