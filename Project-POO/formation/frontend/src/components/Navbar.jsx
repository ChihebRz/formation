import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>Gestion de Formation</h2>
      </div>
      <div className="navbar-content">
        <span>Bienvenue, {user?.login}</span>
        <button onClick={handleLogout} className="logout-btn">
          Se déconnecter
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

