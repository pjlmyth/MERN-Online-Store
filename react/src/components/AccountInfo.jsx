import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const AccountInfo = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            fetchUserInfo();
        }
    }, [user, navigate]);

    const fetchUserInfo = async () => {
        try {
            if (!user || !user.userid) {
                throw new Error('User ID is missing');
            }
            const response = await fetch(`http://localhost:3000/profile/${user.userid}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setUserInfo(data);
        } catch (error) {
            console.error('Error fetching user info:', error);
            setUserInfo(null);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <div className="card mb-4">
                <div className="card-header">
                    <h2>Account Information</h2>
                </div>
                <div className="card-body">
                    <p><strong>Username:</strong> {userInfo.username}</p>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                    <p><strong>First Name:</strong> {userInfo.firstName}</p>
                    <p><strong>Last Name:</strong> {userInfo.lastName}</p>
                    <p><strong>Gender:</strong> {userInfo.gender}</p>
                    <p><strong>Birthday:</strong> {new Date(userInfo.birthday).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );
};

export default AccountInfo;