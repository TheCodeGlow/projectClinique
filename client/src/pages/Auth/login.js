import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoginLoading, loginError, isLoginSuccess } = useAuth();
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
          navigate('/');
        }
      }, [isLoginSuccess, navigate]);
    

    return (
        <div className="container">
            <div className="home-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={handleEmailChange} required />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} required />

                    <button type="submit">Login</button>
                    {loginError && <div className="error">{loginError.message}</div>}
                    {isLoginLoading && <div className='loaderContainer'><div className="loader" /><label id='loaderText'>Loading...</label></div>}
                </form>
            </div>
        </div>
    );
}

export default Login;
