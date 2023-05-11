import { useQuery, useMutation } from 'react-query';
import { fetchPrescriptions, addPrescription } from '../api';

function usePrescriptions(id) {
    const { data, isLoading, error } = useQuery(['prescriptions',id], fetchPrescriptions);

    const addPrescriptionMutation = useMutation(addPrescription);

    const addPrescriptionHandler = async (data) => {
        try {
            await addPrescriptionMutation.mutateAsync(data);
        } catch (err) {
            console.log(err);
        }
    };

    return {
        prescriptions: data,
        isLoading,
        error,
        addPrescriptionHandler,
    };
}

export default usePrescriptions;
