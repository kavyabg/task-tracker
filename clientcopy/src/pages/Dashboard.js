import React from 'react';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-blue-700">Welcome to your Dashboard 🎉</h1>
        <p className="mt-4 text-gray-600">You’re successfully logged in!</p>
      </div>
    </div>
  );
}
