import { useQuery, useMutation, useQueryClient } from "react-query";

const API_URL = "http://localhost:5000";

// Define a custom hook that fetches the list of available consultation sessions
const useConsultations = () => {
    const token = localStorage.getItem("jwt");
    // Use the useQuery hook to make a GET request to /consultations
    const { data, error, isLoading, isError } = useQuery("consultations", () =>
        fetch(API_URL + "/api/consultations", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json())
    );

    // Return the data, error, isLoading and isError values from the useQuery hook
    return { data, error, isLoading, isError };
};

// Define a custom hook that creates a new consultation session
const useCreateConsultation = () => {
    const token = localStorage.getItem("jwt");
    // Get the query client instance from the useQueryClient hook
    const queryClient = useQueryClient();

    // Use the useMutation hook to make a POST request to /consultations
    const { mutate, isLoading, error, isSuccess } = useMutation(
        (newConsultation) =>
            fetch(API_URL + "/api/consultations", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newConsultation),
            }).then((res) => res.json()),
        {
            // On success, invalidate the consultations query to refetch the updated list
            onSuccess: () => {
                queryClient.invalidateQueries("consultations");
            },
        }
    );

    // Return the mutate function and the isLoading, error and isSuccess values from the useMutation hook
    return { mutate, isLoading, error, isSuccess };
};

// Define a custom hook that updates an existing consultation session by its ID
const useUpdateConsultation = () => {
    const token = localStorage.getItem("jwt");
    // Get the query client instance from the useQueryClient hook
    const queryClient = useQueryClient();

    // Use the useMutation hook to make a PUT request to /consultations/{id}
    const { mutate, isLoading, error, isSuccess } = useMutation(
        (updatedConsultation) =>
            fetch(API_URL + `/api/consultations/${updatedConsultation.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedConsultation),
            }).then((res) => res.json()),
        {
            // On success, invalidate the consultations query to refetch the updated list
            onSuccess: () => {
                queryClient.invalidateQueries("consultations");
            },
        }
    );

    // Return the mutate function and the isLoading, error and isSuccess values from the useMutation hook
    return { mutate, isLoading, error, isSuccess };
};

// Define a custom hook that cancels an existing consultation session by its ID
const useCancelConsultation = () => {
    // Get the query client instance from the useQueryClient hook
    const queryClient = useQueryClient();

    const token = localStorage.getItem("jwt");
    // Use the useMutation hook to make a DELETE request to /consultations/{id}
    const { mutate, isLoading, error, isSuccess } = useMutation(
        (id) =>
            fetch(API_URL + `/api/consultations/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        {
            // On success, invalidate the consultations query to refetch the updated list
            onSuccess: () => {
                queryClient.invalidateQueries("consultations");
            },
        }
    );

    // Return the mutate function and the isLoading, error and isSuccess values from the useMutation hook
    return { mutate, isLoading, error, isSuccess };
};

export {
    useConsultations,
    useCreateConsultation,
    useUpdateConsultation,
    useCancelConsultation
}