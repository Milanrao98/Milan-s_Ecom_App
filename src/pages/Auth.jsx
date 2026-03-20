import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { login, signup } = useContext(AppContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      const success = login(formData.username, formData.password);
      if (success) navigate('/');
    } else {
      const success = signup(formData.username, formData.password);
      if (success) setIsLogin(true); // Switch to login screen after register
    }
  };

  return (
    <div className="home-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <div className="success-card"> {/* Borrowing success-card class for consistent styling */}
        <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <p style={{ color: 'var(--secondary-text)', marginBottom: '20px' }}>
            {isLogin ? 'Please enter your credentials to start shopping.' : 'Join us to manage your orders and cart.'}
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="username"
            placeholder="Username" 
            className="search-box input" // Reusing your input styling
            style={{ width: '100%', marginBottom: '15px', borderRadius: '8px' }}
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <input 
            type="password" 
            name="password"
            placeholder="Password" 
            style={{ width: '100%', marginBottom: '20px', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-color)' }}
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="checkout-btn" style={{ width: '100%' }}>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        
        <p style={{ marginTop: '20px', fontSize: '0.9rem' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            style={{ color: 'var(--accent-color)', cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Register Now' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;