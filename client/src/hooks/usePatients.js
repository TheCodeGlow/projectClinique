import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "../middleware/axiosInstance";

const API_URL = "http://localhost:5000";

// Define a custom hook that returns a list of patients
const usePatients = () => {
  // Use useQuery to fetch the patients data from /api/patients
  const { data, error, isLoading } = useQuery("patients", () =>
    axios.get(API_URL + "/api/patients").then((res) => res.data)
  );

  // Return the patients data, error and loading state
  return { patients: data, error, isLoading };
};

// Define a custom hook that returns a single patient
const usePatient = (id) => {
  // Use useQuery to fetch the patient with the given id from /api/patients/{id}
  const { data, error, isLoading } = useQuery(["patient", id], () =>
    axios.get(API_URL + "/api/patients/" + id).then((res) => res.data)
  );

  // Return the patient data, error and loading state
  return { patient: data, error, isLoading };
};

// Define a custom hook that returns a create patient mutation function
const useCreatePatient = () => {
  // Get the query client instance
  const queryClient = useQueryClient();

  // Use useMutation to create a createPatient function that sends the patient data to /api/patients
  const { mutate, data, error, isLoading } = useMutation(
    (patientData) =>
      axios.post(API_URL + "/api/patients",
        patientData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
        }
      ).then((res) => res.data),
    {
      // On success, invalidate the patients query to refetch the updated list
      onSuccess: (data) => {
        queryClient.invalidateQueries("patients");
      },
    }
  );

  // Return the createPatient function, data, error and loading state
  return { mutate, data, error, isLoading };
};

// Define a custom hook that returns an update patient mutation function
const useUpdatePatient = (id) => {
  // Get the query client instance
  const queryClient = useQueryClient();

  // Use the useMutation hook to perform the PUT request to the /doctors/{id} endpoint
  const { mutate, isLoading, isError, error } = useMutation(
    (updatedPatient) =>
      axios.put(API_URL + `/api/patients/${id}`,
      updatedPatient,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
        }),
    {
      // On success, invalidate the doctor query to refetch the updated data
      onSuccess: () => {
        queryClient.invalidateQueries(["patient", id]);
      },
    }
  );

  // Return the mutate function and the loading and error state
  return { mutate, isLoading, isError, error };
};

// Define a custom hook that returns a delete patient mutation function
const useDeletePatient = () => {
  // Get the query client instance
  const queryClient = useQueryClient();

  // Use useMutation to create a deletePatient function that sends the id to /api/patients/{id}
  const { mutate, data, error, isLoading } = useMutation(
    (id) => axios.delete(API_URL + `/api/patients/${id}`).then((res) => res.data),
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
  usePatient,
  useCreatePatient,
  useUpdatePatient,
  useDeletePatient
}