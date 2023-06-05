import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoginLoading, isLoading, loginError, isLoginSuccess, refetch } = useAuth();
    let navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        login({ email: email, password: password });
    };

    useEffect(() => {
        if (isLoginSuccess) {
            refetch();
            navigate('/');
        }
    }, [isLoginSuccess, navigate , refetch]);

    if (isLoginLoading &&  !isLoading) {
        return <div className="login-box">
            <div className="loaderContainer">
                <div className="loader" />
            </div>
        </div>;
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login to HealthHub</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />

                    <button type="submit" className="login-button">
                        Log In
                    </button>
                </form>

                <div className="login-links">
                    <a href="/">Forgot Password?</a>
                    <span className="divider">·</span>
                    <a href="/">Create New Account</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
