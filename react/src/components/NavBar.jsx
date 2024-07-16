import React , { useState } from 'react';
import Search from './Search';
import { useNavigate } from 'react-router-dom';


const NavBar = (props) => {
    const navigate = useNavigate();
    const cartClick = (cart) => {
      console.log("in CartClick")
      console.log(cart)
      navigate('/cart',{state:props.cart})
    }

    const handbags= () => {
        props.setPage(['Handbags']);
        
    }

    const shoes= () => {
        props.setPage(['Shoes']);
        
    }

    const jewelry= () => {
        props.setPage(['Jewelry']);
        
    }

    const perfumes= () => {
        props.setPage(['Perfumes']);
        
    }
    
    const [data, setData] = useState([]);


    return (
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Louis Vui-Travelers</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Women</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Men</a>
              </li>
              <li className="nav-item">
                <div className="nav-link" onClick={()=>{cartClick(props.cart)}}>Cart ({props.cartCount})</div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  More
                </a>
                <ul className="dropdown-menu">
                  <li onClick={handbags}><a className="dropdown-item" >Handbags</a></li>
                  <li onClick={jewelry}><a className="dropdown-item" href="#">Jewelry</a></li>
                  <li onClick={shoes}><a className="dropdown-item" href="#">Shoes</a></li>
                  <li onClick={perfumes}><a className="dropdown-item" href="#">Perfumes</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Account Info</a></li>
                </ul>
              </li>
              </ul>
            <form className="d-flex" role="search">
              <Search setData={setData} /> {/* Include the Search component here */}
            </form>
          </div>
        </div>
      </nav>
      </>
    );
};


export default NavBar;