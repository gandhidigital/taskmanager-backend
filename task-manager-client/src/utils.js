// src/utils.js
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

// Actualizar una tarea existente
export const updateTask = async (id, updatedData) => {
  const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, updatedData);
  return response.data;
};

// Eliminar una tarea
export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/tasks/${id}`);
  return response.data;
};

