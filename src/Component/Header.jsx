import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

const Header = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const location=useLocation()
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    setEmail('');
    navigate('/login'); // use navigate instead of window.location.href
  };

  return (
    <header className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
      <a href="/">
      <h1 className="text-xl font-bold">Hospital Dashboard</h1>
      </a>
      
      <div className="flex items-center gap-4">
        {email && <span>Welcome, {email}</span>}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
