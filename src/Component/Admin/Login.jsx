import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3050/api/v1/adminLogin', {
        email,
        password
      });

      alert(res.data.message); // or use toast
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('email', res.data.email);
      localStorage.setItem('role', res.data.role);
      // Redirect to dashboard or homepage
      if (res.data.role === 'admin') {
      Navigate('/');
    } else if (res.data.role === 'doctor') {
      Navigate('/doctor');
    } else if (res.data.role === 'nutritionist') {
      Navigate('/nutritionist/dashboard');
    } else {
      Navigate('/'); // fallback
    }
      
      console.log('successful login')
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
          Welcome to Hospital Food Delivery Management
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 bg-blue-100 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-blue-100 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Login
          </button>
          {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
