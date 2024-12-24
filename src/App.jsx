import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import LoginForm from './components/LogInfORM.JSX';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/tasks/new" element={<TaskForm />} />
        <Route path="/tasks/:id" element={<TaskForm />} />
      </Routes>
    </Router>
  );
}

export default App;
