import { useState, useContext, useEffect } from 'react';
import { useMutation } from 'react-query';
import { UserContext } from '../contexts/UserContext';

const API_URL = 'http://localhost:5000/api';

const useApi = (endpoint) => {
    return useMutation(async (data) => {
        const res = await fetch(`${API_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error(`Failed to ${endpoint}: ${res.statusText}`);
        }

        return await res.json();
    });
};

const useAuth = () => {
    const { user, setUser } = useContext(UserContext);
    const [error, setError] = useState(null);

    const loginMutation = useApi('auth/login');
    const registerMutation = useApi('auth/register');

    useEffect(() => {
        setError(null);
    }, [loginMutation, registerMutation]);

    const login = (credentials) => {
        loginMutation.mutate(credentials);
    };

    const register = (userData) => {
        registerMutation.mutate(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return {
        user,
        error,
        isLoading: loginMutation.isLoading || registerMutation.isLoading,
        login,
        register,
        logout,
    };
};

export default useAuth;
