import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

// Define a custom hook that fetches the list of doctors
const useDoctors = () => {
    // Use the useQuery hook to fetch the data from the /doctors endpoint
    const { data, error, isLoading, isError } = useQuery("doctors", () =>
        axios.get("/doctors").then((res) => res.data)
    );

    // Return the data, error and loading state
    return { data, error, isLoading, isError };
};

// Define a custom hook that fetches a specific doctor by their ID
const useDoctor = (id) => {
    // Use the useQuery hook to fetch the data from the /doctors/{id} endpoint
    const { data, error, isLoading, isError } = useQuery(["doctor", id], () =>
        axios.get(`/doctors/${id}`).then((res) => res.data)
    );

    // Return the data, error and loading state
    return { data, error, isLoading, isError };
};

// Define a custom hook that creates a new doctor
const useCreateDoctor = () => {
    // Get the query client instance
    const queryClient = useQueryClient();

    // Use the useMutation hook to perform the POST request to the /doctors endpoint
    const { mutate, isLoading, isError, error } = useMutation(
        (newDoctor) => axios.post("/doctors", newDoctor).then((res) => res.data),
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
            axios.put(`/doctors/${id}`, updatedDoctor).then((res) => res.data),
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
