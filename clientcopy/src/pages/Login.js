import React, { useState } from 'react';
import { useLoginForm } from '../forms/useLoginForm';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { handleSubmit, loading, status } = useLoginForm();
  const navigate = useNavigate();

const onSubmit = async (e) => {
  e.preventDefault();
  const result = await handleSubmit(formData);

  if (result?.token) {
    navigate('/dashboard'); // 👈 redirect after login
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-4">
      <form
        onSubmit={onSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700">Welcome Back</h2>

        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg font-semibold text-white ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
          } transition`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {status.message && (
          <div
            className={`text-center text-sm font-medium p-2 rounded ${
              status.success ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
            }`}
          >
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
}
