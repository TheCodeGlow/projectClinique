import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const API_URL = "http://localhost:5000";

const useAppointments = () => {
    const getAppointments = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/appointments`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            return response.data;
        } catch (error) {
            throw new Error("Failed to fetch appointments");
        }
    };

    const { data, error, isLoading, isError } = useQuery("appointments", getAppointments);
    let appointments = data;
    return { appointments, error, isLoading, isError };
};

const useCreateAppointment = () => {
    const queryClient = useQueryClient();

    const createAppointment = async (newAppointment) => {
        try {
            const response = await axios.post(`${API_URL}/api/appointments`, newAppointment, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            return response.data;
        } catch (error) {
            throw new Error("Failed to create appointment");
        }
    };

    const mutation = useMutation(createAppointment, {
        onSuccess: () => {
            queryClient.invalidateQueries("appointments");
        },
    });

    return mutation;
};

const useUpdateAppointment = () => {
    const queryClient = useQueryClient();

    const updateAppointment = async (updatedAppointment) => {
        try {
            const response = await axios.put(
                `${API_URL}/api/appointments/${updatedAppointment.id}`,
                updatedAppointment,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            return response.data;
        } catch (error) {
            throw new Error("Failed to update appointment");
        }
    };

    const approveAppointment = async (id) => {
        try {
            const response = await axios.put(
                `${API_URL}/api/appointments/${id}/approve`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            queryClient.invalidateQueries("appointments");
            return response.data;
        } catch (error) {
            throw new Error("Failed to approve appointment");
        }
    };

    const rejectAppointment = async (id) => {
        try {
            const response = await axios.put(
                `${API_URL}/api/appointments/${id}/reject`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            queryClient.invalidateQueries("appointments");
            return response.data;
            
        } catch (error) {
            throw new Error("Failed to reject appointment");
        }
    };

    const mutation = useMutation(updateAppointment, {
        onSuccess: () => {
            queryClient.invalidateQueries("appointments");
        },
    });

    return { updateAppointment: mutation, approveAppointment, rejectAppointment };
};

const useCancelAppointment = () => {
    const queryClient = useQueryClient();

    const cancelAppointment = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/appointments/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
        } catch (error) {
            throw new Error("Failed to cancel appointment");
        }
    };

    const mutation = useMutation(cancelAppointment, {
        onSuccess: () => {
            queryClient.invalidateQueries("appointments");
        },
    });

    return mutation;
};

export {
    useAppointments,
    useCreateAppointment,
    useUpdateAppointment,
    useCancelAppointment,
};
