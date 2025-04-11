import api from '../api';

export const registerUser = async (username, password) => {
  try {
    const res = await api.post('/auth/register', { username, password });
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message;
  }
};

export const loginUser = async (username, password) => {
  try {
    const res = await api.post('/auth/login', { username, password });
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message;
  }
};
