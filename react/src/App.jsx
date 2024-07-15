import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import ProductsList from './components/ProductsList'
import Register from './components/register'
import LoginForm from './components/LoginForm'


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
  console.log(cart)
  }, [cart]);

  const addToCart = (el) => {
    setCart([...cart, el]);
    };

  return (
    <>
    <Router>
      <NavBar data={data} page={page} setPage={setPage}/>
      <Routes>
        <Route exact path="/" element={<ProductsList data={data} page={page} setPage={setPage} addToCart={addToCart}/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<LoginForm/>}/>
      </Routes>
    </Router>
      
    </>
  )
}

export default App
