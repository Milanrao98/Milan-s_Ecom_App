import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const CheckoutSuccess = () => {
  const { setCart, user } = useContext(AppContext);

  useEffect(() => {
    if (setCart) {
      setCart([]);
    }
    localStorage.removeItem('cart');
  }, [setCart]);

  return (
    /* Use 'home-container' to center the whole section properly */
    <div className="home-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <div className="success-card">
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
        <h1>Order Confirmed!</h1>
        <p>Thank you for your purchase, <strong>{user?.name || 'Milan'}</strong>.</p>
        <p className="order-number">Order #ORD-{Math.floor(Math.random() * 1000000)}</p>
        <div className="success-actions" style={{ marginTop: '20px' }}>
          {/* Use 'filter-btn active' to borrow the existing styled button look */}
          <Link to="/" className="filter-btn active" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;