import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <img src="/logo.png" alt="Standard Engineering Logo" className="logo-img" />
              <h1>Standard Engineering</h1>
            </Link>
          </div>

          <nav className="nav">
            {!isAuthenticated ? (
              <div className="nav-links">
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="nav-link btn btn-primary">Register</Link>
              </div>
            ) : (
              <div className="nav-links">
                {user?.role === 'admin' ? (
                  <>
                    <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
                    <Link to="/admin/products" className="nav-link">Products</Link>
                    <Link to="/admin/orders" className="nav-link">Orders</Link>
                    <Link to="/admin/quotations" className="nav-link">Quotations</Link>
                    <Link to="/admin/users" className="nav-link">Users</Link>
                  </>
                ) : (
                  <>
                    <Link to="/products" className="nav-link">Products</Link>
                    <Link to="/requirements" className="nav-link">My Requirements</Link>
                    <Link to="/orders" className="nav-link">My Orders</Link>
                    <Link to="/quotations" className="nav-link">Quotations</Link>
                    <Link to="/contact" className="nav-link">Contact Us</Link>
                  </>
                )}
                <div className="user-menu">
                  <span className="user-name">{user?.firstName}</span>
                  <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                </div>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
