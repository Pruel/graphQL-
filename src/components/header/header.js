import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth';
import './header.css';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/profile">
          <img src="/images/logo.png" alt="GraphQL Logo" />
        </Link>
      </div>
      <div className="header-right">
        <Link to="/profile" className="profile-link">
          Profile
        </Link>
        <button onClick={handleLogout} className="logout-button">
          Log Out
        </button>
      </div>
    </header>
  );
}

export default Header;
