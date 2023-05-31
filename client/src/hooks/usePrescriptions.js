import { useQuery, useMutation, useQueryClient } from "react-query";

const API_URL = "http://localhost:5000";

// Define a custom hook that fetches a patient's prescriptions by their ID
const usePatientPrescriptions = (id) => {
    // Use the useQuery hook to make a GET request to /patients/{id}/prescriptions
    const { data, error, isLoading, isError } = useQuery(
        ["patientPrescriptions", id],
        () => fetch(API_URL+`/api/patients/${id}/prescriptions`).then((res) => res.json())
    );

    let prescriptions = data;
    // Return the data, error, isLoading and isError values from the useQuery hook
    return { prescriptions, error, isLoading, isError };
};

// Define a custom hook that creates a new prescription for a patient by their ID
const useCreatePatientPrescription = () => {
    // Get the query client instance from the useQueryClient hook
    const queryClient = useQueryClient();

    // Use the useMutation hook to make a POST request to /patients/{id}/prescriptions
    const { mutate, isLoading, error, isSuccess } = useMutation(
        (newPrescription) =>
            fetch(API_URL+`/api/patients/${newPrescription.id}/prescriptions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPrescription),
            }).then((res) => res.json()),
        {
            // On success, invalidate the patientPrescriptions query to refetch the updated data
            onSuccess: () => {
                queryClient.invalidateQueries("patientPrescriptions");
            },
        }
    );

    // Return the mutate function and the isLoading, error and isSuccess values from the useMutation hook
    return { mutate, isLoading, error, isSuccess };
};

// Define a custom hook that updates a specific prescription for a patient by their ID and prescription ID
const useUpdatePatientPrescription = () => {
    // Get the query client instance from the useQueryClient hook
    const queryClient = useQueryClient();

    // Use the useMutation hook to make a PUT request to /patients/{id}/prescriptions/{prescription_id}
    const { mutate, isLoading, error, isSuccess } = useMutation(
        (updatedPrescription) =>
            fetch( API_URL+`/api/patients/${updatedPrescription.id}/prescriptions/${updatedPrescription.prescription_id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedPrescription),
                }
            ).then((res) => res.json()),
        {
            // On success, invalidate the patientPrescriptions query to refetch the updated data
            onSuccess: () => {
                queryClient.invalidateQueries("patientPrescriptions");
            },
        }
    );

    // Return the mutate function and the isLoading, error and isSuccess values from the useMutation hook
    return { mutate, isLoading, error, isSuccess };
};

// Define a custom hook that deletes a specific prescription for a patient by their ID and prescription ID
const useDeletePatientPrescription = () => {
    // Get the query client instance from the useQueryClient hook
    const queryClient = useQueryClient();

    // Use the useMutation hook to make a DELETE request to /patients/{id}/prescriptions/{prescription_id}
    const { mutate, isLoading, error, isSuccess } = useMutation(
        ({ id, prescription_id }) =>
            fetch(API_URL+`/api/patients/${id}/prescriptions/${prescription_id}`, {
                method: "DELETE",
            }),
        {
            // On success, invalidate the patientPrescriptions query to refetch the updated data
            onSuccess: () => {
                queryClient.invalidateQueries("patientPrescriptions");
            },
        }
    );

    // Return the mutate function and the isLoading, error and isSuccess values from the useMutation hook
    return { mutate, isLoading, error, isSuccess };
};

// Export the custom hooks
export {
    usePatientPrescriptions,
    useCreatePatientPrescription,
    useUpdatePatientPrescription,
    useDeletePatientPrescription,
}