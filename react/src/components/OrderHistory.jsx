import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import ProductsList from './ProductsList';

const OrderHistory = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            fetchOrderHistory();
        }
    }, [user, navigate]);

    const fetchOrderHistory = async () => {
        try {
            if (!user || !user.userid) {
                throw new Error('User ID is missing');
            }
            const response = await fetch(`http://localhost:3000/user_orders/${user.userid}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setOrderHistory(data);
        } catch (error) {
            console.error('Error fetching order history:', error);
            setOrderHistory([]);
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
                    {orderHistory.length > 0 ? (
                        orderHistory.map((order, index) => (
                            <div key={index} className="mb-4">
                                <h4>Order #{order.orderId}</h4>
                                <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                                <ProductsList data={order.products} addToCart={() => {}} />
                                <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                            </div>
                        ))
                    ) : (
                        <p>No order history available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderHistory;