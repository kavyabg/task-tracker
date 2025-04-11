// client/src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password
      });
      alert('✅ Registered successfully!');
    } catch (error) {
      alert('❌ Registration failed: ' + error.response.data.message || error.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Register</h2>
      <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <br /><br />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <br /><br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
