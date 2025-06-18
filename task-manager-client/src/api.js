// src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// Obtener todas las tareas
export const fetchTasks = async () => {
  const response = await axios.get(`${API_BASE_URL}/tasks`);
  return response.data;
};

// Obtener todos los usuarios
export const fetchUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`);
  return response.data;
};

// Crear una nueva tarea
export const createTask = async (taskData) => {
  const response = await axios.post(`${API_BASE_URL}/tasks`, taskData);
  return response.data;
};

// Actualizar una tarea
export const updateTask = async (taskId, updatedData) => {
  const response = await axios.put(`${API_BASE_URL}/tasks/${taskId}`, updatedData);
  return response.data;
};

// Eliminar una tarea
export const deleteTask = async (taskId) => {
  const response = await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
  return response.data;
};

