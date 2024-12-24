// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

// const LogInForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const navigate = useNavigate(); // Initialize navigation

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess(false);

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }), // Send email and password
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Something went wrong');
//       }

//       console.log('Logged in successfully:', data);
//       setSuccess(true);

//       // Save token and user details in localStorage (optional)
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));

//       // Redirect to the Task Page
//       navigate('/tasks');
//     } catch (err) {
//       console.error('Error logging in:', err.message);
//       setError(err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleLogin} className="bg-white p-4 rounded shadow-md">
//       <h2 className="text-xl font-bold mb-4">Log In</h2>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       {success && <p className="text-green-500 mb-4">Login Successful!</p>}
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="border p-2 mb-4 w-full"
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="border p-2 mb-4 w-full"
//         required
//       />
//       <button
//         type="submit"
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
//       >
//         Log In
//       </button>
//     </form>
//   );
// };

// export default LogInForm;

