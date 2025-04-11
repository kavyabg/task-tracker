import { useState } from 'react';
import { loginUser } from '../services/authService';

export const useLoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ success: null, message: '' });

  const handleSubmit = async (formData) => {
    setLoading(true);
    setStatus({ success: null, message: '' });

    try {
      const result = await loginUser(formData.username, formData.password);
      localStorage.setItem('token', result.token);
      setStatus({ success: true, message: 'Logged in successfully!' });
      return result;
    } catch (error) {
      setStatus({
        success: false,
        message: error,
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading, status };
};
