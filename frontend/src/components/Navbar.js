import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, removeToken, removeUserFromStorage, getUserFromStorage } from '../api';

function Navbar() {
  const token = getToken();
  const user = getUserFromStorage();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    removeUserFromStorage();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          URL Shortener
        </Link>
      </div>
      <div className="navbar-links">
        {token ? (
          <>
            <span style={{ padding: '0.5rem 1rem', color: '#666' }}>
              Welcome, {user?.name}
            </span>
            <Link to="/dashboard" className="btn btn-secondary">
              Dashboard
            </Link>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
