import { useQuery, useMutation, useQueryClient } from "react-query";

const API_URL = "http://localhost:5000";
// Define a custom hook that fetches the list of available appointment slots
const useAppointments = () => {
    // Use the useQuery hook to make a GET request to /appointments
    const { data, error, isLoading, isError } = useQuery("appointments", () =>
    fetch(API_URL + "/api/appointments", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).then((res) => res.json())
    );

    // Return the data, error, isLoading and isError values from the useQuery hook
    return { data, error, isLoading, isError };
};

// Define a custom hook that creates a new appointment
const useCreateAppointment = () => {
    const token = localStorage.getItem("jwt");
    // Get the query client instance from the useQueryClient hook
    const queryClient = useQueryClient();

    // Use the useMutation hook to make a POST request to /appointments
    const { mutate, isLoading, error, isSuccess } = useMutation(
        (newAppointment) =>
            fetch(API_URL + "/api/appointments", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newAppointment),
            }).then((res) => res.json()),
        {
            // On success, invalidate the appointments query to refetch the updated list
            onSuccess: () => {
                queryClient.invalidateQueries("appointments");
            },
        }
    );

    // Return the mutate function and the isLoading, error and isSuccess values from the useMutation hook
    return { mutate, isLoading, error, isSuccess };
};

// Define a custom hook that updates an existing appointment by its ID
const useUpdateAppointment = () => {
    const token = localStorage.getItem("jwt");
    // Get the query client instance from the useQueryClient hook
    const queryClient = useQueryClient();

    // Use the useMutation hook to make a PUT request to /appointments/{id}
    const { mutate, isLoading, error, isSuccess } = useMutation(
        (updatedAppointment) =>
            fetch(API_URL + `/api/appointments/${updatedAppointment.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedAppointment),
            }).then((res) => res.json()),
        {
            // On success, invalidate the appointments query to refetch the updated list
            onSuccess: () => {
                queryClient.invalidateQueries("appointments");
            },
        }
    );

    // Return the mutate function and the isLoading, error and isSuccess values from the useMutation hook
    return { mutate, isLoading, error, isSuccess };
};

// Define a custom hook that cancels an existing appointment by its ID
const useCancelAppointment = () => {
    const token = localStorage.getItem("jwt");
    // Get the query client instance from the useQueryClient hook
    const queryClient = useQueryClient();

    // Use the useMutation hook to make a DELETE request to /appointments/{id}
    const { mutate, isLoading, error, isSuccess } = useMutation(
        (id) =>
            fetch(API_URL + `/api/appointments/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }),
        {
            // On success, invalidate the appointments query to refetch the updated list
            onSuccess: () => {
                queryClient.invalidateQueries("appointments");
            },
        }
    );

    // Return the mutate function and the isLoading, error and isSuccess values from the useMutation hook
    return { mutate, isLoading, error, isSuccess };
};

export {
    useAppointments,
    useCreateAppointment,
    useUpdateAppointment,
    useCancelAppointment
};