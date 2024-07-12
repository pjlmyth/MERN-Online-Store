import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import Handbags from './components/Handbags'
import Perfumes from './components/Perfumes'
import Shoes from './components/Shoes'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/products`);
            if (!response.ok) {
                throw new Error('Data could not be fetched!');
            }
            const json_response = await response.json();
            setData(json_response); // assign JSON response to the data variable.
        } catch (error) {
            console.error('Error fetching socks:', error);
        }
    };

    fetchData();
}, []);

  return (
    <>
    <Router>
      <NavBar />
      <Routes>
          <Route exact path="/handbags" element={<Handbags data={data} />} />
          <Route exact path="/perfumes" element={<Perfumes data={data} />} />
          <Route exact path="/shoes" element={<Shoes data={data} />} />
          
      </Routes>
    </Router>
      
    </>
  )
}

export default App
