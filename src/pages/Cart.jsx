import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom'; // Combined imports

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, user } = useContext(AppContext);
  const navigate = useNavigate(); // Hook must be inside the component

  const handleCheckout = () => {
    navigate('/checkout-success');
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty, {user?.name}!</h2>
        <Link to="/" className="back-link">Go back to shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="item-price">${item.price}</p>
              
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
              </div>
            </div>
            
            <div className="item-total">
              <p>${item.price * item.quantity}</p>
              <button 
                className="remove-btn" 
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: ${total}</h3>
        <button 
  className="checkout-btn" 
  onClick={() => navigate('/checkout-success')}
>
  Proceed to Checkout
</button>
      </div>
    </div>
  );
};

export default Cart;