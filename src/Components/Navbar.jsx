import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../Assets/Srikanth-removebg-preview.png';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { CartContext } from '../CartContext';

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#75bdf0' }}>
      <div className="container-fluid align-items-center">

        {/* Logo */}
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="Logo" width="100" />
        </NavLink>

        {/* Toggle for small screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content */}
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">

          {/* Search Bar (Desktop only) */}
          <form
            className="d-none d-lg-flex mx-auto"
            style={{ width: '60%' }}
            role="search"
            onSubmit={handleSubmit}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search the products"
              value={searchTerm}
              onChange={handleInputChange}
              style={{
                borderRadius: '12px',
                padding: '10px 20px',
                backgroundColor: '#fff',
                border: 'none',
                boxShadow: '0 0 5px rgba(0,0,0,0.2)',
                flex: 1
              }}
            />
            <button
              className="btn btn-outline-dark"
              type="submit"
              style={{
                padding: '6px 14px',
                fontSize: '14px',
                borderRadius: '8px',
                width:'74px',
              }}
            >
              Search
            </button>
          </form>

          {/* Navigation Links */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link nav-animate text-dark">
                <i className="bi bi-house-door-fill me-1"></i> Home
              </NavLink>
            </li>

            <li className="nav-item position-relative">
              <NavLink to="/Cart" className="nav-link nav-animate text-dark position-relative">
                <i className="bi bi-cart-fill me-1"></i> Cart
                {totalItems > 0 && (
                  <span className="cart-badge">{totalItems}</span>
                )}
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/Contact" className="nav-link nav-animate text-dark">
                <i className="bi bi-telephone-fill me-1"></i> Contact us
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle nav-animate text-dark" href="#" id="accountDropdown" role="button" data-bs-toggle="dropdown">
                <i className="bi bi-person-fill me-1"></i> Account
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="accountDropdown">
                <li><NavLink to="/Login" className="dropdown-item">Login</NavLink></li>
                <li><NavLink to="/Signup" className="dropdown-item">Signup</NavLink></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
