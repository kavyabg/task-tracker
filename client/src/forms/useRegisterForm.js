import { useState } from 'react';
import { registerUser } from '../services/authService';

export const useRegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ success: null, message: '' });

  const handleSubmit = async (formData) => {
    setLoading(true);
    setStatus({ success: null, message: '' });

    try {
      const result = await registerUser(formData.username, formData.password);
      setStatus({ success: true, message: 'Registered successfully!' });
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
