import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

const NavBar = (props) => {
    const { user, logout } = useAuth();

    const handbags = () => {
        props.setPage(['Handbags']);
        console.log(props.page);
    }

    const shoes = () => {
        props.setPage(['Shoes']);
        console.log(props.page);
    }

    const jewelry = () => {
        props.setPage(['Jewelry']);
        console.log(props.page);
    }

    const perfumes = () => {
        props.setPage(['Perfumes']);
        console.log(props.page);
    }

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
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Women</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Men</a>
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
                                    <li className="nav-item"><Link className="nav-link" to="/account">Account Info</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to="/order-history">Order History</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        {user ? (
                            <div className="ms-2 d-flex align-items-center">
                                <span className="me-2">Welcome, {user.firstName || user.username}!</span>
                                <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
                            </div>
                        ) : (
                            <div className="ms-2">
                                <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
                                <Link to="/register" className="btn btn-outline-secondary">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;