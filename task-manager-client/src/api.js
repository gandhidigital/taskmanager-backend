// src/api.js
import axios from 'axios';

// ✅ Asegúrate de poner tu URL real de Render aquí:
const API_BASE_URL = 'https://taskmanager-backend.onrender.com/api';

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
  const response = await axios.patch(`${API_BASE_URL}/tasks/${taskId}`, updatedData); // usas PATCH, no PUT
  return response.data;
};

// Eliminar una tarea (si más adelante implementas esta ruta)
export const deleteTask = async (taskId) => {
  const response = await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
  return response.data;
};

