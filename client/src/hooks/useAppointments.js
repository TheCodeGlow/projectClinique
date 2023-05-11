import { useQuery, useMutation } from 'react-query';
import { fetchAppointments, addAppointment } from '../api';

function useAppointments(id) {
    const { isLoading, error, data } = useQuery(['appointments', id], () => fetchAppointments(id));

    const addAppointmentMutation = useMutation(addAppointment);

    const addAppointmentHandler = async (data) => {
        try {
            await addAppointmentMutation.mutateAsync(data);
        } catch (err) {
            console.log(err);
        }
    };

    return {
        appointments: data,
        isLoading,
        error,
        addAppointmentHandler,
    };
}


export default useAppointments;
