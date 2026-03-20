import React, { useState, useEffect, useMemo, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import CartSummary from '../components/CartSummary';
import PRODUCTS from '../Data/products';
// 1. Define the Custom Hook at the top for easy reuse and clean structure
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timer to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: clears the timer if the value changes before delay is finished
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};



const Home = () => {
  const { addToCart } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 2. Initialize the debounced search term (400ms is a standard delay)
  const debouncedSearch = useDebounce(searchTerm, 400);

  const categories = ["All", ...new Set(PRODUCTS.map(p => p.category))];

  // 3. Use useMemo to filter only when the DEBOUNCED term or category changes
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [debouncedSearch, selectedCategory]);

  return (
    <div className="home-container">
      <header className="hero">
        <h1>Featured Collection</h1>
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-filters">
          {categories.map(cat => (
            <button 
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>
      
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`}>
                <div className="image-container">
                  <span className="category-tag">{product.category}</span>
                  <img src={product.image} alt={product.name} />
                </div>
              </Link>

              <div className="product-info">
                <Link to={`/product/${product.id}`} className="product-title-link">
                  <h3>{product.name}</h3>
                </Link>
                <p className="price">${product.price}</p>
                <button className="add-btn" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No products found in "{selectedCategory}" matching "{debouncedSearch}"</p>
          </div>
        )}
      </div>
      <CartSummary />
    </div>
  );
};

export default Home;