import React , { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';
import Search  from './Search'

const NavBar = (props) => {
    const { user, logout } = useAuth();
    
    const cartClick = (cart) => {
      console.log("in CartClick")
      console.log(cart)
      navigate('/cart',{state:props.cart})
    }
    const handbags= () => {
        props.setPage(['Handbags']);
        console.log(props.page);
    }

    const shoes= () => {
        props.setPage(['Shoes']);
        console.log(props.page);
    }

    const jewelry= () => {
        props.setPage(['Jewelry']);
        console.log(props.page);
    }

    const perfumes= () => {
        props.setPage(['Perfumes']);
        console.log(props.page);
    }

    const [data, setData] = useState([]);


    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Louis Vui-Travelers</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Women</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Men</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                More
                            </Link>
                            <ul className="dropdown-menu">
                                <li onClick={handbags}><Link className="dropdown-item" to="#">Handbags</Link></li>
                                <li onClick={jewelry}><Link className="dropdown-item" to="#">Jewelry</Link></li>
                                <li onClick={shoes}><Link className="dropdown-item" to="#">Shoes</Link></li>
                                <li onClick={perfumes}><Link className="dropdown-item" to="#">Perfumes</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="/account">Account Info</Link></li>
                                <li><Link className="dropdown-item" to="/order-history">View Order History</Link></li>
                            </ul>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                      <Search setData={setData} /> {/* Include the Search component here */}
                  </form>
                    {user ? (
                        <div className="ms-2">
                            <span className="me-2">Welcome, {user.username}!</span>
                            <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
                        </div>
                    ) : (
                        <div className="ms-2">
                            <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
                            <Link to="/register" className="btn btn-outline-secondary">Register</Link>
                        </div>
                    )}
                    <Link to="/cart" className="btn btn-outline-primary ms-2">Cart</Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;