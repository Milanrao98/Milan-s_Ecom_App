import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const CartSummary = () => {
  const { cart } = useContext(AppContext);
  const navigate = useNavigate();

  if (cart.length === 0) return null;

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="cart-summary-bar" onClick={() => navigate('/cart')}>
      <div className="summary-left">
        <span className="badge">{itemCount}</span>
        <p>Items in your cart</p>
      </div>
      <div className="summary-right">
        <p className="total-amount">${total}</p>
        <span className="view-cart-text">View Cart →</span>
      </div>
    </div>
  );
};

export default CartSummary;