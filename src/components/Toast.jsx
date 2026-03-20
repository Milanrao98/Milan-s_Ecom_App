// src/components/Toast.jsx
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const Toast = () => {
  // Change 'toast' to 'notification' to match your AppProvider
  const { notification, showToast } = useContext(AppContext);

  if (!notification) return null;

  return (
    <div className="toast-container">
      <div className="toast-message">
        <span className="toast-icon">✅</span>
        <p>{notification}</p>
      </div>
    </div>
  );
};

export default Toast;