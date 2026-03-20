import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const ProductCard = ({ product }) => {
  const { addToCart, toggleFavorite, favorites } = useContext(AppContext);
  const isFavorite = favorites.includes(product.id);

  return (
    <div className="product-card">
      <div className="image-container" style={{ position: 'relative' }}>
        <button 
          className="fav-btn" 
          onClick={(e) => {
            e.preventDefault(); 
            toggleFavorite(product.id);
          }}
          style={{
            position: 'absolute', top: '10px', right: '10px',
            background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%',
            width: '30px', height: '30px', cursor: 'pointer', zIndex: 2
          }}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>

        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '8px' }} />
        </Link>
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p>${product.price}</p>
        <button className="add-btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;