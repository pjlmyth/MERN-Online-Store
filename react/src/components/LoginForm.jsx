import React, { useState } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');
        if (!username || !password) {
            setError('Please fill in all fields');
            return;
        }
        try {
            await login(username, password);
            navigate('/');
        } catch (err) {
            console.log(err);
            setError(err.message || "An error occurred during login");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2><center>Login</center></h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="username"><strong>Username</strong></label>
                        <input 
                            type="text" 
                            id="username"
                            placeholder='Enter Username' 
                            autoComplete='off' 
                            className='form-control rounded-0' 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input 
                            type="password" 
                            id="password"
                            placeholder='Enter Password' 
                            className='form-control rounded-0' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Login
                    </button>
                </form>
                <p>Don't have an account?</p>
                <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Sign Up
                </Link>
            </div>
        </div>
    );
}

export default LoginForm;