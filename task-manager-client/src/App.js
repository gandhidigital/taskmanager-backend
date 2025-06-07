import React, { useEffect, useState } from 'react';
import './App.css';
import TaskTable from './TaskTable';
import TaskForm from './TaskForm';
import { fetchTasks, fetchUsers, createTask } from './api';
import logo from './assets/Upload.svg'; // Logo importado

function App() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParentTask, setSelectedParentTask] = useState(null);
  const [isSubtask, setIsSubtask] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [tasksData, usersData] = await Promise.all([
        fetchTasks(),
        fetchUsers()
      ]);
      setTasks(tasksData);
      setUsers(usersData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  };

  const handleCreateTask = () => {
    setSelectedParentTask(null);
    setIsSubtask(false);
    setIsModalOpen(true);
  };

  const handleCreateSubtask = (parentId) => {
    setSelectedParentTask(parentId);
    setIsSubtask(true);
    setIsModalOpen(true);
  };

  const handleSubmitTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al crear tarea:', error);
    }
  };

  return (
    <div
      className="App"
      style={{ backgroundColor: '#262026', minHeight: '100vh' }}
    >
      <img src={logo} alt="Task Manager Logo" className="logo" />

      <button onClick={handleCreateTask} className="btn-crear-tarea">
        Crear nueva tarea
      </button>

      <TaskTable tasks={tasks} onCreateSubtask={handleCreateSubtask} />

      {isModalOpen && (
        <TaskForm
          onSubmit={handleSubmitTask}
          onClose={() => setIsModalOpen(false)}
          parentTask={selectedParentTask}
          isSubtask={isSubtask}
          users={users}
        />
      )}
    </div>
  );
}

export default App;

