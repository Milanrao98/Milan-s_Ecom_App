import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import  PRODUCTS  from './Data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const productId = parseInt(id);
  
  const { 
    addToCart, 
    user, 
    favorites, 
    toggleFavorite, 
    reviews, 
    addReview 
  } = useContext(AppContext);

  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  const product = PRODUCTS.find(p => p.id === productId);
  const isFavorite = favorites.includes(productId);
  const currentReviews = reviews[productId] || [];

  if (!product) return <div className="container">Product not found!</div>;

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    addReview(productId, reviewText, rating);
    setReviewText("");
    setRating(5);
  };

  return (
    <div className="product-detail-container">
      <Link to="/" className="back-link">← Back to Products</Link>
      
      <div className="detail-layout">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
          {/* We keep this one for visual flair, or you can remove it if you prefer it only by the button */}
          <button 
            className={`detail-fav-btn ${isFavorite ? 'active' : ''}`}
            onClick={() => toggleFavorite(productId)}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
        
        <div className="detail-info">
          <span className="detail-category">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="detail-price">${product.price}</p>
          <p className="detail-description">{product.description}</p>
          
          {/* --- NEW ACTION BUTTONS ROW --- */}
          <div className="action-buttons" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button className="add-btn large" style={{ flex: 1 }} onClick={() => addToCart(product)}>
              Add to Cart
            </button>
            
            <button 
              className={`fav-action-btn ${isFavorite ? 'active' : ''}`}
              onClick={() => toggleFavorite(productId)}
              title={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
              style={{
                width: '60px',
                fontSize: '1.5rem',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                background: 'var(--card-bg)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          </div>
          
          <div className="trust-badges" style={{ marginTop: '20px' }}>
            <p>✓ Free Shipping</p>
            <p>✓ 30-Day Returns</p>
          </div>
        </div>
      </div>

      <hr className="divider" />

      {/* --- Reviews Section --- */}
      <section className="reviews-section">
        <h2>Customer Reviews ({currentReviews.length})</h2>
        
        {user ? (
          <form className="review-form" onSubmit={handleReviewSubmit}>
            <h3>Write a Review</h3>
            <div className="rating-selector">
              <label>Rating: </label>
              <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                {[5, 4, 3, 2, 1].map(num => (
                  <option key={num} value={num}>{num} Stars</option>
                ))}
              </select>
            </div>
            <textarea 
              placeholder="Share your thoughts on this product..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            />
            <button type="submit" className="checkout-btn">Submit Review</button>
          </form>
        ) : (
          <p className="login-prompt">Please <Link to="/login">login</Link> to write a review.</p>
        )}

        <div className="review-list">
          {currentReviews.length > 0 ? (
            currentReviews.map(rev => (
              <div key={rev.id} className="review-item">
                <div className="review-header">
                  <strong>{rev.username}</strong>
                  <span className="stars">{"⭐".repeat(rev.rating)}</span>
                </div>
                <p>{rev.text}</p>
                <small>{rev.date}</small>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to review!</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;