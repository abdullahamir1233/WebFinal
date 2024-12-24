// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import LogInForm from './components/LogInForm';
// import TaskPage from './pages/TaskPage';
// import { AuthProvider } from './context/AuthContext';

// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           {/* Login Route */}
//           <Route path="/login" element={<LogInForm />} />

//           {/* Task Management (protected) */}
//           <Route path="/tasks" element={<ProtectedRoute component={TaskPage} />} />

//           {/* Redirect to login by default */}
//           <Route path="*" element={<Navigate to="/login" />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// const ProtectedRoute = ({ component: Component }) => {
//   const token = localStorage.getItem('token');

//   return token ? <Component /> : <Navigate to="/login" />;
// };

// export default App;
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TaskPage from './pages/TaskPage';
import './App.css';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/tasks" element={<TaskPage />} />
    </Routes>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
