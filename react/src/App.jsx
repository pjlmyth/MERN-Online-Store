import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import ProductsList from './components/ProductsList'
import Register from './components/register'
import LoginForm from './components/LoginForm'
import { AuthProvider } from './hooks/AuthContext';
import Cart from './components/Cart'
import AccountInfo from './components/AccountInfo';
import OrderHistory from './components/OrderHistory'
import Search from "./components/Search";
import ProductsInCart from './components/ProductsInCart'


import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

function App() {
  
  const [cart, setCart] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${page}`);
        if (!response.ok) {
          throw new Error('Data could not be fetched!');
        }
        const json_response = await response.json();
        setData(json_response); // assign JSON response to the data variable.
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    
  }, [cart]);

  const addToCart = (el) => {
    setCart([...cart, el]);
  };

  
  return (
    <>
    <AuthProvider>
    <Router>
      <NavBar data={data} page={page} setPage={setPage}/>
      <Routes>
        <Route exact path="/" element={<ProductsList data={data} page={page} setPage={setPage} addToCart={addToCart}/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path="/account" element={<AccountInfo />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path='/cart' element={<Cart data={cart}/>}/>
      </Routes>
    </Router>
    </AuthProvider>  
    </>
  )
}

export default App
