import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskTable from './TaskTable';
import TaskForm from './TaskForm';
import './App.css';
import logo from './assets/Upload.svg'; // ← Corrección aquí

function App() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [parentTaskId, setParentTaskId] = useState(null);
  const [isSubtask, setIsSubtask] = useState(false);

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await axios.post('/api/tasks', taskData);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleOpenForm = (parentId = null) => {
    setIsSubtask(!!parentId);
    setParentTaskId(parentId);
    setShowForm(true);
  };

  return (
    <div className="App">
<div className="header">
  <img src={logo} alt="Logo" className="logo" />
  <div className="crear-tarea-container">
    <button className="btn-crear-tarea" onClick={() => handleOpenForm()}>
      Crear nueva tarea
    </button>
  </div>
</div>

      <TaskTable
        tasks={tasks}
        setTasks={setTasks}
        onCreateSubtask={handleOpenForm}
        users={users}
      />

      {showForm && (
        <TaskForm
          onSubmit={handleCreateTask}
          onClose={() => setShowForm(false)}
          parentTask={parentTaskId}
          isSubtask={isSubtask}
          users={users}
        />
      )}
    </div>
  );
}

export default App;

