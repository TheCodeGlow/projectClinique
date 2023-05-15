import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoginLoading, loginError, isLoginSuccess } = useAuth();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle form submission logic here
        login({ email: email, password: password });
        if(isLoginSuccess){
            //return to homepage

        }
    };

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
                    {isLoginLoading && <div className="loader">Loading...</div>}
                </form>
            </div>
        </div>
    );
}

export default Login;
