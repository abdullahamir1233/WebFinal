// import React, { useState, useContext } from 'react';
// import AuthContext from '../context/AuthContext';

// const LoginPage = () => {
//   const { login } = useContext(AuthContext);
//   const [formData, setFormData] = useState({ email: '', password: '' });

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await login(formData.email, formData.password);
//       window.location.href = '/tasks'; // Redirect after login
//     } catch (err) {
//       alert('Invalid credentials');
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center">
//       <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
//         <h2 className="text-xl font-bold mb-4">Log In</h2>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="block w-full p-2 mb-4 border rounded"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="block w-full p-2 mb-4 border rounded"
//           required
//         />
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
//           Log In
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        username,
        password,
      });

      // Save JWT token in localStorage
      localStorage.setItem('token', response.data.token);

      // Redirect to tasks page
      navigate('/tasks');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
