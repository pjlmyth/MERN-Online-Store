import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProductsList from './components/ProductsList';
import ProductsInCart from './components/ProductsInCart';
import { AuthProvider } from './hooks/AuthContext';
import LoginForm from './components/LoginForm';
import Register from './components/register';
import AccountInfo from './components/AccountInfo';
import OrderHistory from './components/OrderHistory';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {

  toast.configure()

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(['All']);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    try {
      let url = 'http://localhost:3000/products';
      if (page[0] !== 'All') {
        url += `/${page[0]}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    toast(`Added ${product.name} to cart`);
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== productId));
  };

  const handleSearchResults = (searchResults) => {
    setProducts(searchResults);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <NavBar cart={cart} setPage={setPage} onSearchResults={handleSearchResults} />
          <Routes>
            <Route path="/" element={<ProductsList data={products} addToCart={addToCart} />} />
            <Route path="/cart" element={<ProductsInCart cart={cart} removeFromCart={removeFromCart} />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<AccountInfo />} />
            <Route path="/order-history" element={<OrderHistory />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;