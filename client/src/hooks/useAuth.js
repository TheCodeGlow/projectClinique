import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000";

const useGetCurrentUser = (token) => {
  const { data, error, isLoading, refetch } = useQuery("currentUser", () => {
    if (token) { // Check if token exists
      return axios
        .get(API_URL + "/api/auth/me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => res.data);
    } else {
      return Promise.resolve(null); // Return a resolved promise with null if token is not available
    }
  });

  return { user: data, error, isLoading, refetch };
};
const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  const handleSetToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const { user, error, isLoading, refetch } = useGetCurrentUser(token);

  const [refetchUser, setRefetchUser] = useState(false);

  const {
    mutate: login,
    data: loginData,
    error: loginError,
    isLoading: isLoginLoading,
    isSuccess: isLoginSuccess,
  } = useMutation(
    (credentials) =>
      axios.post(API_URL + "/api/auth/login", credentials).then((res) => res.data),
    {
      onSuccess: (data) => {
        handleSetToken(data.token);
        setRefetchUser(true);
      },
    }
  );

  const {
    mutate: register,
    data: registerData,
    error: registerError,
    isLoading: isRegisterLoading,
  } = useMutation(
    (userData) =>
      axios.post(API_URL + "/api/auth/register", userData).then((res) => res.data),
    {
      onSuccess: (data) => {
        handleSetToken(data.token);
        setRefetchUser(true);
      },
    }
  );

  useEffect(() => {
    if (refetchUser) {
      refetch().then(() => {
        setLoading(false);
      });
      setRefetchUser(false);
    } else {
      setLoading(false);
    }
  }, [refetchUser, refetch]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return {
    user,
    error,
    isLoading: isLoading || loading, // Include isLoading from useGetCurrentUser
    login,
    loginData,
    loginError,
    isLoginLoading,
    isLoginSuccess,
    register,
    registerData,
    registerError,
    isRegisterLoading,
    logout,
  };
};

export default useAuth;
