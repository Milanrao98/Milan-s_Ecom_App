import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
// Update this import to point to the new component
import ProductCard from '../components/ProductCard'; 

const Favorites = ({ allProducts }) => {
  const { favorites } = useContext(AppContext);

  const favoriteProducts = allProducts.filter(product => 
    favorites.map(Number).includes(Number(product.id))
  );

  return (
    <div className="home-container">
      <h1>My Wishlist ❤️</h1>
      <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {favoriteProducts.length > 0 ? (
          favoriteProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="no-results">Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;