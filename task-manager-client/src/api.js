import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const fetchTasks = async () => {
  const res = await axios.get(`${API_BASE_URL}/tasks`);
  return res.data;
};

export const fetchUsers = async () => {
  const res = await axios.get(`${API_BASE_URL}/users`);
  return res.data;
};

export const createTask = async (taskData) => {
  const res = await axios.post(`${API_BASE_URL}/tasks`, taskData);
  return res.data;
};

