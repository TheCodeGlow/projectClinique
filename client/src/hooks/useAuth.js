import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { useState, useEffect } from "react";

// Define the api url
const API_URL = "http://localhost:5000";

// Rename useGetCurrentUser to getCurrentUser
const useGetCurrentUser = () => {
    // Use useQuery to fetch the user data from /api/auth/me
    const { data, error, isLoading, refetch } = useQuery("currentUser", () =>
        axios.post(API_URL + "/api/auth/me").then((res) => res.data)
    );

    // Return the user data, error, loading state and refetch function
    return { user: data, error, isLoading, refetch };
};

// Define a custom hook that returns the login and register mutations
const useAuth = () => {
    // Use useGetCurrentUser to get the current user
    const { user, error, isLoading, refetch } = useGetCurrentUser();

    // Define a state variable to store the refetch flag
    const [refetchUser, setRefetchUser] = useState(false);

    // Define a login mutation function that sends the credentials to /api/auth/login
    const { mutate: login, data: loginData, error: loginError, isLoading: isLoginLoading } = useMutation(
        (credentials) =>
            axios.post(API_URL + "/api/auth/login", credentials).then((res) => res.data),
        {
            // On success, set a flag to indicate that user needs to be refetched
            onSuccess: (data) => {
                setRefetchUser(true);
            },
        }
    );

    // Define a register mutation function that sends the user data to /api/auth/register
    const { mutate: register, data: registerData, error: registerError, isLoading: isRegisterLoading } = useMutation(
        (userData) =>
            axios.post(API_URL + "/api/auth/register", userData).then((res) => res.data),
        {
            // On success, set a flag to indicate that user needs to be refetched
            onSuccess: (data) => {
                setRefetchUser(true);
            },
        }
    );

    // Use an effect to refetch the user when the flag is true
    useEffect(() => {
        if (refetchUser) {
            refetch();
            setRefetchUser(false);
        }
    }, [refetchUser, refetch]);

    // Return the user data, login and register mutations, and their loading and error states
    return { user, login, loginData, loginError, isLoginLoading, register, registerData, registerError, isRegisterLoading };
};

export default useAuth;
