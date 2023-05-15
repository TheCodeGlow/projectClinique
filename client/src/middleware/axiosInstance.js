import axios from "axios";



// Retrieve the token from local storage
const getToken = () => {
    return localStorage.getItem("token");
};

// Add a request interceptor to add the token to the header
axios.interceptors.request.use(
    (config) => {
        // Get the token from local storage
        const token = getToken();

        // If the token exists, add it to the header
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axios;
