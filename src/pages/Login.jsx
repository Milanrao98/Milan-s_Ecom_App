import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      login(username); // This updates our global state
      navigate('/');   // Send them back to the home page after login
    } else {
      alert("Please enter a name to login!");
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome Back</h2>
      <p>Please enter your name to start shopping.</p>
      <form onSubmit={handleSubmit} className="login-form">
        <input 
          type="text" 
          placeholder="Enter your name..." 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;