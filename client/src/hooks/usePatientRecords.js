import { useQuery, useMutation, useQueryClient } from "react-query";

const API_URL = "http://localhost:5000";

// Define a custom hook that fetches a patient's medical records by their ID
const usePatientRecords = (id) => {
    // Use the useQuery hook to make a GET request to /patients/{id}/records
    const { data, error, isLoading, isError } = useQuery(
        ["patientRecords", id],
        () => fetch(`/patients/${id}/records`).then((res) => res.json())
    );

    // Return the data, error, isLoading and isError values from the useQuery hook
    return { data, error, isLoading, isError };
};

// Define a custom hook that updates a patient's medical records by their ID
const useUpdatePatientRecords = () => {
    // Get the query client instance from the useQueryClient hook
    const queryClient = useQueryClient();

    // Use the useMutation hook to make a PUT request to /patients/{id}/records
    const { mutate, isLoading, error, isSuccess } = useMutation(
        (updatedRecords) =>
            fetch(API_URL+`/api/patients/${updatedRecords.id}/records`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedRecords),
            }).then((res) => res.json()),
        {
            // On success, invalidate the patientRecords query to refetch the updated data
            onSuccess: () => {
                queryClient.invalidateQueries("patientRecords");
            },
        }
    );

    // Return the mutate function and the isLoading, error and isSuccess values from the useMutation hook
    return { mutate, isLoading, error, isSuccess };
};

// Define a custom hook that creates a new medical record for a patient by their ID
const useCreatePatientRecord = () => {
    // Get the query client instance from the useQueryClient hook
    const queryClient = useQueryClient();

    // Use the useMutation hook to make a POST request to /patients/{id}/records
    const { mutate, isLoading, error, isSuccess } = useMutation(
        (newRecord) =>
            fetch(API_URL+`/api/patients/${newRecord.id}/records`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newRecord),
            }).then((res) => res.json()),
        {
            // On success, invalidate the patientRecords query to refetch the updated data
            onSuccess: () => {
                queryClient.invalidateQueries("patientRecords");
            },
        }
    );

    // Return the mutate function and the isLoading, error and isSuccess values from the useMutation hook
    return { mutate, isLoading, error, isSuccess };
};

// Define a custom hook that deletes a specific medical record for a patient by their ID and record ID
const useDeletePatientRecord = () => {
    // Get the query client instance from the useQueryClient hook
    const queryClient = useQueryClient();

    // Use the useMutation hook to make a DELETE request to /patients/{id}/records/{record_id}
    const { mutate, isLoading, error, isSuccess } = useMutation(
        ({ id, record_id }) =>
            fetch(API_URL+`/api/patients/${id}/records/${record_id}`, {
                method: "DELETE",
            }),
        {
            // On success, invalidate the patientRecords query to refetch the updated data
            onSuccess: () => {
                queryClient.invalidateQueries("patientRecords");
            },
        }
    );

    // Return the mutate function and the isLoading, error and isSuccess values from the useMutation hook
    return { mutate, isLoading, error, isSuccess };
};

export {
    usePatientRecords,
    useUpdatePatientRecords,
    useCreatePatientRecord,
    useDeletePatientRecord
}
