import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "../middleware/axiosInstance";

const API_URL = "http://localhost:5000";

// Define a custom hook that fetches the list of doctors
const useDoctors = () => {
    //dont use useQuery hook here
    const { data, error, isLoading, isError } = useQuery("doctors", () =>
        fetch(API_URL + "/api/doctors").then((res) => res.json())
    );
    let doctors = data;
    // Return the data, error and loading state
    return { doctors, error, isLoading, isError };

};

// Define a custom hook that fetches a specific doctor by their ID
const useDoctor = (id) => {
    // Use the useQuery hook to fetch the data from the /doctors/{id} endpoint
    const { data, error, isLoading, isError } = useQuery(["doctor", id], () =>
        axios.get(API_URL + `/api/doctors/${id}`).then((res) => res.data)
    );
    let doctor = data;
    // Return the data, error and loading state
    return { doctor, error, isLoading, isError };
};

// Define a custom hook that creates a new doctor
const useCreateDoctor = () => {
    // Get the query client instance
    const queryClient = useQueryClient();

    // Use the useMutation hook to perform the POST request to the /doctors endpoint
    const { mutate, isLoading, isError, error } = useMutation(
        (newDoctor) => axios.post(API_URL + "/api/doctors", newDoctor).then((res) => res.data),
        {
            // On success, invalidate the doctors query to refetch the updated list
            onSuccess: () => {
                queryClient.invalidateQueries("doctors");
            },
        }
    );

    // Return the mutate function and the loading and error state
    return { mutate, isLoading, isError, error };
};

// Define a custom hook that updates a specific doctor by their ID
const useUpdateDoctor = (id) => {
    // Get the query client instance
    const queryClient = useQueryClient();

    // Use the useMutation hook to perform the PUT request to the /doctors/{id} endpoint
    const { mutate, isLoading, isError, error } = useMutation(
        (updatedDoctor) =>
            axios.put(API_URL + `/api/doctors/${id}`,
                updatedDoctor,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                }),
        {
            // On success, invalidate the doctor query to refetch the updated data
            onSuccess: () => {
                queryClient.invalidateQueries(["doctor", id]);
            },
        }
    );

    // Return the mutate function and the loading and error state
    return { mutate, isLoading, isError, error };
};

// Define a custom hook that deletes a specific doctor by their ID
const useDeleteDoctor = (id) => {
    // Get the query client instance
    const queryClient = useQueryClient();

    // Use the useMutation hook to perform the DELETE request to the /doctors/{id} endpoint
    const { mutate, isLoading, isError, error } = useMutation(
        () => axios.delete(`/doctors/${id}`).then((res) => res.data),
        {
            // On success, invalidate the doctors query to refetch the updated list
            onSuccess: () => {
                queryClient.invalidateQueries("doctors");
            },
        }
    );

    // Return the mutate function and the loading and error state
    return { mutate, isLoading, isError, error };
};

export {
    useDoctors,
    useDoctor,
    useCreateDoctor,
    useUpdateDoctor,
    useDeleteDoctor,
};
