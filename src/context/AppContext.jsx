import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // --- 1. State Initialization (with Persistence) ---
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('reviews');
    return saved ? JSON.parse(saved) : {}; 
  });

  const [notification, setNotification] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // --- 2. Persistence Side Effects ---
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user && token) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [user, token]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  // --- 3. Authentication Logic ---
  const signup = (username, password) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || "[]");
    if (registeredUsers.find(u => u.username === username)) {
      showToast("Username already taken!");
      return false;
    }
    const newUser = { username, password, id: Date.now() };
    localStorage.setItem('registeredUsers', JSON.stringify([...registeredUsers, newUser]));
    showToast("Registration successful! Please login.");
    return true;
  };

  const login = (username, password) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || "[]");
    const userMatch = registeredUsers.find(u => u.username === username && u.password === password);

    if (userMatch) {
      const mockToken = `session_${userMatch.id}`;
      setToken(mockToken);
      setUser(userMatch);
      showToast(`Welcome, ${userMatch.username}!`);
      return true;
    }
    showToast("Invalid credentials");
    return false;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setCart([]);
    showToast("Logged out successfully");
  };

  // --- 4. Favorites & Reviews Logic ---
  const toggleFavorite = (productId) => {
    if (!user) return showToast("Please login first");
    setFavorites(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const addReview = (productId, text, rating) => {
    if (!user) return showToast("Please login first");
    const newReview = { id: Date.now(), username: user.username, text, rating, date: new Date().toLocaleDateString() };
    setReviews(prev => ({
      ...prev,
      [productId]: prev[productId] ? [...prev[productId], newReview] : [newReview]
    }));
    showToast("Review added!");
  };

  // --- 5. Cart Actions ---
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      return existing 
        ? prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...prev, { ...product, quantity: 1 }];
    });
    showToast(`${product.name} added!`);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));

  const updateQuantity = (id, amount) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
    ));
  };

  // --- 6. Utilities ---
  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <AppContext.Provider value={{ 
      cart, user, token, favorites, reviews, notification, theme,
      login, logout, signup, toggleFavorite, addReview, addToCart, removeFromCart, updateQuantity, toggleTheme 
    }}>
      {children}
    </AppContext.Provider>
  );
};