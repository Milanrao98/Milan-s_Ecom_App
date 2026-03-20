import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

// Navbar.jsx

const Navbar = () => {
  // Add 'favorites' to the list below
  const { cart, user, logout, theme, toggleTheme, favorites } = useContext(AppContext);

  // The rest of your code remains the same...
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar">
      <h1>Milan's Ecom</h1>
      <div className="links">
        <button className="theme-btn" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({totalItems})</Link>
        
        {/* Now favorites.length will work because favorites is defined! */}
        <Link to="/favorites">Wishlist ({favorites ? favorites.length : 0})</Link>
        
        {user ? (
          <div className="user-section">
            <span className="welcome-text">Hi, {user.username}</span> 
            <button className="logout-btn" onClick={logout}>Logout</button>
          </div>
        ) : (
          <Link to="/login" className="login-link">Login</Link>
        )}
      </div>
    </nav>
  );
};
export default Navbar;