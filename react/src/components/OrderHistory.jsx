import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import ProductsList from './ProductsList';

const OrderHistory = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [orderProducts, setOrderProducts] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            fetchOrderHistory();
        }
    }, [user, navigate]);

    const fetchOrderHistory = async () => {
        try {
            if (!user || !user.username) {
                throw new Error('Username is missing');
            }
            console.log(user.username)
            const response = await fetch(`http://localhost:3000/user_orders/${user.username}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setOrderProducts(data);
        } catch (error) {
            console.error('Error fetching order history:', error);
            setOrderProducts([]);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h2>Order History</h2>
                    <Link to="/account" className="btn btn-primary">Back to Account</Link>
                </div>
                <div className="card-body">
                    {orderProducts.length > 0 ? (
                        <div>
                            <h4>Products Ordered</h4>
                            <ProductsList data={orderProducts} showAddToCart={false} />
                        </div>
                    ) : (
                        <p>No order history available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderHistory;