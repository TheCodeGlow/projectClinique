import { useQuery, useMutation, useQueryClient } from "react-query";

const API_URL = "http://localhost:5000";

const useAppointments = () => {
    const getAppointments = async () => {
        const response = await fetch(`${API_URL}/api/appointments`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch appointments");
        }

        return response.json();
    };
    
    const { data, error, isLoading, isError } = useQuery("appointments", getAppointments);
    let appointments = data;
    return { appointments, error, isLoading, isError };
};

const useCreateAppointment = () => {
    const queryClient = useQueryClient();

    const createAppointment = async (newAppointment) => {
        const response = await fetch(`${API_URL}/api/appointments`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAppointment),
        });

        if (!response.ok) {
            throw new Error("Failed to create appointment");
        }

        return response.json();
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
        const response = await fetch(`${API_URL}/api/appointments/${updatedAppointment.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedAppointment),
        });

        if (!response.ok) {
            throw new Error("Failed to update appointment");
        }

        return response.json();
    };

    const mutation = useMutation(updateAppointment, {
        onSuccess: () => {
            queryClient.invalidateQueries("appointments");
        },
    });

    return mutation;
};

const useCancelAppointment = () => {
    const queryClient = useQueryClient();

    const cancelAppointment = async (id) => {
        const response = await fetch(`${API_URL}/api/appointments/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
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
    useCancelAppointment
};
