// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Load from localStorage when the app starts
    const storedEmail = localStorage.getItem('email');
    const storedToken = localStorage.getItem('token');
    if (storedEmail) setEmail(storedEmail);
    if (storedToken) setToken(storedToken);
  }, []);

  const login = (token, email) => {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    setToken(token);
    setEmail(email);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setToken(null);
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{ email, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
