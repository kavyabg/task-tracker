// client/src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });

      localStorage.setItem('token', res.data.token);
      alert('✅ Logged in successfully!');
    } catch (error) {
      alert('❌ Login failed: ' + error.response.data.message || error.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <br /><br />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <br /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
