//useRemoteConsultation hook
import { useQuery, useMutation } from 'react-query';
import { fetchRemoteConsultation, addRemoteConsultation } from '../api';

function useRemoteConsultation(id) {
    const { data, isLoading, error } = useQuery(['remoteConsultations', id], fetchRemoteConsultation(id));

    const addRemoteConsultationMutation = useMutation(addRemoteConsultation);

    const addRemoteConsultationHandler = async (data) => {
        try {
            await addRemoteConsultationMutation.mutateAsync(data);
        } catch (err) {
            console.log(err);
        }
    };

    return {
        remoteConsultations: data,
        isLoading,
        error,
        addRemoteConsultationHandler,
    };
}

export default useRemoteConsultation;