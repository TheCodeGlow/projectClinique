import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "../middleware/axiosInstance";

const API_URL = "http://localhost:5000";

// Define a custom hook that returns a list of patients
const usePatients = () => {
  // Use useQuery to fetch the patients data from /api/patients
  const { data, error, isLoading } = useQuery("patients", () =>
    axios.get(API_URL+"/api/patients").then((res) => res.data)
  );

  // Return the patients data, error and loading state
  return { patients: data, error, isLoading };
};

// Define a custom hook that returns a create patient mutation function
const useCreatePatient = () => {
  // Get the query client instance
  const queryClient = useQueryClient();

  // Use useMutation to create a createPatient function that sends the patient data to /api/patients
  const { mutate, data, error, isLoading } = useMutation(
    (patientData) =>
      axios.post(API_URL+"/api/patients", patientData).then((res) => res.data),
    {
      // On success, invalidate the patients query to refetch the updated list
      onSuccess: (data) => {
        queryClient.invalidateQueries("patients");
      },
    }
  );

  // Return the createPatient function, data, error and loading state
  return { createPatient: mutate, data, error, isLoading };
};

// Define a custom hook that returns an update patient mutation function
const useUpdatePatient = () => {
  // Get the query client instance
  const queryClient = useQueryClient();

  // Use useMutation to create an updatePatient function that sends the patient data and id to /api/patients/{id}
  const { mutate, data, error, isLoading } = useMutation(
    ({ patientData, id }) =>
      axios.put(API_URL+`/api/patients/${id}`, patientData).then((res) => res.data),
    {
      // On success, invalidate the patients query to refetch the updated list
      onSuccess: (data) => {
        queryClient.invalidateQueries("patients");
      },
    }
  );

  // Return the updatePatient function, data, error and loading state
  return { updatePatient: mutate, data, error, isLoading };
};

// Define a custom hook that returns a delete patient mutation function
const useDeletePatient = () => {
  // Get the query client instance
  const queryClient = useQueryClient();

  // Use useMutation to create a deletePatient function that sends the id to /api/patients/{id}
  const { mutate, data, error, isLoading } = useMutation(
    (id) => axios.delete(API_URL+`/api/patients/${id}`).then((res) => res.data),
    {
      // On success, invalidate the patients query to refetch the updated list
      onSuccess: (data) => {
        queryClient.invalidateQueries("patients");
      },
    }
  );

  // Return the deletePatient function, data, error and loading state
  return { deletePatient: mutate, data, error, isLoading };
};

export {
    usePatients,
    useCreatePatient,
    useUpdatePatient,
    useDeletePatient
}