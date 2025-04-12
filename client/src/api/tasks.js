import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  console.log("🔐 Token:", token); 
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

export const fetchTasks = () =>
  axios.get(`${BASE_URL}/api/tasks`, getAuthHeader());

export const createTask = (data) =>
  axios.post(`${BASE_URL}/api/tasks`, data, getAuthHeader());

export const updateTask = (id, data) =>
  axios.put(`${BASE_URL}/api/tasks/${id}`, data, getAuthHeader());

export const deleteTask = (id) =>
  axios.delete(`${BASE_URL}/api/tasks/${id}`, getAuthHeader());
