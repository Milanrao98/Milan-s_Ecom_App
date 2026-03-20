import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
// We will create these pages next
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Toast from './components/Toast';
import CheckoutSuccess from './pages/CheckoutSucess';
import Auth from './pages/Auth';
import Favorites from './pages/Favorites';
import  PRODUCTS  from './Data/products';

function App() {
  const { user } = useContext(AppContext);
  return (
    <div className="App">
      <Toast />
      <Navbar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/favorites" element={<Favorites allProducts={PRODUCTS} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
