"use client";

import { useEffect, useState } from 'react';
import AuthContext from './authContextInstance';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      setUser(stored ? JSON.parse(stored) : null);
    } catch {
      setUser(null);
    } finally {
      setIsAuthReady(true);
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthReady(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthReady(true);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthReady, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
