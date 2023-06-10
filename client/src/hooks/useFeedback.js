import { useQuery, useMutation, useQueryClient } from "react-query";

const API_URL = "http://localhost:5000";

// Define a custom hook that fetches the average rating of a doctor
const useAverageDoctorRating = (doctorId) => {
  // Use the useQuery hook to make a GET request to the api endpoint
  const { data, error, isLoading, isError } = useQuery(
    ["averageRating", doctorId], // Provide a unique query key
    async () => {
      const response = await fetch(API_URL + `/api/feedback/average/${doctorId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
      if (!response.ok) {
        throw new Error("Failed to fetch average rating");
      }
      const data = await response.json();
      return data;
    }
  );

  // Return the data, error, isLoading, and isError values from the useQuery hook
  return { data, error, isLoading, isError };
};

// Define a custom hook that fetches all feedback
const useFeedback = () => {
  // Use the useQuery hook to make a GET request to the api endpoint
  const { data, error, isLoading, isError } = useQuery(
    "feedback", // Provide a unique query key
    async () => {
      const response = await fetch(API_URL + "/api/feedback",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch feedback");
      }
      const data = await response.json();
      return data;
    }
  );

  // Return the data, error, isLoading, and isError values from the useQuery hook
  return { data, error, isLoading, isError };
};

// Define a custom hook that creates new feedback
const useCreateFeedback = () => {
  // Get the query client instance from the useQueryClient hook
  const queryClient = useQueryClient();

  // Use the useMutation hook to make a POST request to the api endpoint
  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    (newFeedback) =>
      fetch(API_URL + "/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(newFeedback),
      }).then((res) => res.json()), // Provide a mutation function that returns a promise
    {
      // Provide an onSuccess callback that invalidates the query for all feedback
      onSuccess: () => {
        queryClient.invalidateQueries("feedback");
      },
    }
  );

  // Return the mutate function and the isLoading, isError, error, and isSuccess values from the useMutation hook
  return { mutate, isLoading, isError, error, isSuccess };
};

// Define a custom hook that fetches specific feedback by its ID
const useFeedbackById = (feedbackId) => {
  // Use the useQuery hook to make a GET request to the api endpoint
  const { data, error, isLoading, isError } = useQuery(
    ["feedback", feedbackId], // Provide a unique query key
    async () => {
      const response = await fetch(API_URL + `/api/feedback/${feedbackId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
      if (!response.ok) {
        throw new Error("Failed to fetch feedback by ID");
      }
      const data = await response.json();
      return data;
    }
  );

  // Return the data, error, isLoading, and isError values from the useQuery hook
  return { data, error, isLoading, isError };
};

// Define a custom hook that updates specific feedback by its ID
const useUpdateFeedback = () => {
  // Get the query client instance from the useQueryClient hook
  const queryClient = useQueryClient();

  // Use the useMutation hook to make a PUT request to the api endpoint
  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    ({ feedbackId, updatedFeedback }) =>
      fetch(API_URL + `/api/feedback/${feedbackId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(updatedFeedback),
      }).then((res) => res.json()), // Provide a mutation function that returns a promise
    {
      // Provide an onSuccess callback that invalidates the query for all feedback and the specific feedback by its ID
      onSuccess: (data) => {
        queryClient.invalidateQueries("feedback");
        queryClient.invalidateQueries(["feedback", data.id]);
      },
    }
  );

  // Return the mutate function and the isLoading, isError, error, and isSuccess values from the useMutation hook
  return { mutate, isLoading, isError, error, isSuccess };
};

// Define a custom hook that deletes specific feedback by its ID
const useDeleteFeedback = () => {
  // Get the query client instance from the useQueryClient hook
  const queryClient = useQueryClient();

  // Use the useMutation hook to make a DELETE request to the api endpoint
  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    (feedbackId) =>
      fetch(API_URL + `/api/feedback/${feedbackId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      }).then((res) => res.json()), // Provide a mutation function that returns a promise
    {
      // Provide an onSuccess callback that invalidates the query for all feedback and the specific feedback by its ID
      onSuccess: (data) => {
        queryClient.invalidateQueries("feedback");
        queryClient.invalidateQueries(["feedback", data.id]);
      },
    }
  );

  // Return the mutate function and the isLoading, isError, error, and isSuccess values from the useMutation hook
  return { mutate, isLoading, isError, error, isSuccess };
};

export {
  useAverageDoctorRating,
  useFeedback,
  useCreateFeedback,
  useFeedbackById,
  useUpdateFeedback,
  useDeleteFeedback,
};
