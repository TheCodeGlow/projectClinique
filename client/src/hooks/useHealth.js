import { useQuery, useMutation, useQueryClient } from "react-query";

const API_URL = "http://localhost:5000";
// Define a custom hook that fetches a patient's health data by their ID
const usePatientHealthData = (patientId) => {
    // Use the useQuery hook to make a GET request to the api endpoint
    const { data, error, isLoading, isError } = useQuery(
        ["patientHealthData", patientId], // Provide a unique query key
        () => fetch(API_URL+`/api/patients/${patientId}/health-data`).then((res) => res.json()) // Provide a query function that returns a promise
    );

    // Return the data, error, isLoading and isError values from the useQuery hook
    return { data, error, isLoading, isError };
};

// Define a custom hook that creates new health data for a patient by their ID
const useCreatePatientHealthData = (patientId) => {
    // Get the query client instance from the useQueryClient hook
    const queryClient = useQueryClient();

    // Use the useMutation hook to make a POST request to the api endpoint
    const { mutate, isLoading, isError, error, isSuccess } = useMutation(
        (newHealthData) =>
            fetch(API_URL+`/api/patients/${patientId}/health-data`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newHealthData),
            }).then((res) => res.json()), // Provide a mutation function that returns a promise
        {
            // Provide an onSuccess callback that invalidates the query for the patient's health data
            onSuccess: () => {
                queryClient.invalidateQueries(["patientHealthData", patientId]);
            },
        }
    );

    // Return the mutate function and the isLoading, isError, error and isSuccess values from the useMutation hook
    return { mutate, isLoading, isError, error, isSuccess };
};

// Define a custom hook that updates specific health data for a patient by their ID and data ID
const useUpdatePatientHealthData = (patientId) => {
    // Get the query client instance from the useQueryClient hook
    const queryClient = useQueryClient();

    // Use the useMutation hook to make a PUT request to the api endpoint
    const { mutate, isLoading, isError, error, isSuccess } = useMutation(
        ({ dataId, updatedHealthData }) =>
            fetch(API_URL+`/api/patients/${patientId}/health-data/${dataId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedHealthData),
            }).then((res) => res.json()), // Provide a mutation function that returns a promise
        {
            // Provide an onSuccess callback that invalidates the query for the patient's health data
            onSuccess: () => {
                queryClient.invalidateQueries(["patientHealthData", patientId]);
            },
        }
    );

    // Return the mutate function and the isLoading, isError, error and isSuccess values from the useMutation hook
    return { mutate, isLoading, isError, error, isSuccess };
};

// Define a custom hook that deletes specific health data for a patient by their ID and data ID
const useDeletePatientHealthData = (patientId) => {
    // Get the query client instance from the useQueryClient hook
    const queryClient = useQueryClient();

    // Use the useMutation hook to make a DELETE request to the api endpoint
    const { mutate, isLoading, isError, error, isSuccess } = useMutation(
        (dataId) =>
            fetch(API_URL+`/api/patients/${patientId}/health-data/${dataId}`, {
                method: "DELETE",
            }).then((res) => res.json()), // Provide a mutation function that returns a promise
        {
            // Provide an onSuccess callback that invalidates the query for the patient's health data
            onSuccess: () => {
                queryClient.invalidateQueries(["patientHealthData", patientId]);
            },
        }
    );

    // Return the mutate function and the isLoading, isError, error and isSuccess values from the useMutation hook
    return { mutate, isLoading, isError, error, isSuccess };
};

export {
    usePatientHealthData,
    useCreatePatientHealthData,
    useUpdatePatientHealthData,
    useDeletePatientHealthData
}