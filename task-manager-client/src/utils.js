// src/utils.js
import api from './api';

// Obtener todas las tareas
export const fetchTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

// Obtener todos los usuarios
export const fetchUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

// Crear una nueva tarea
export const createTask = async (taskData) => {
  const response = await api.post('/tasks', taskData);
  return response.data;
};

// Actualizar una tarea existente
export const updateTask = async (id, updatedData) => {
  const response = await api.put(`/tasks/${id}`, updatedData);
  return response.data;
};

// Eliminar una tarea
export const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

