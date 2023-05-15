import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000";

const useGetCurrentUser = (token) => {
  const { data, error, isLoading, refetch } = useQuery("currentUser", () =>
    axios
      .get(API_URL + "/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data)
  );

  return { user: data, error, isLoading, refetch };
};

const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleSetToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

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
      refetch();
      setRefetchUser(false);
    }
  }, [refetchUser, refetch]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return {
    user,
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
