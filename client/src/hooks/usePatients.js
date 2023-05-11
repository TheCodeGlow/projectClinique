//usePatients hook
import { useQuery, useMutation } from 'react-query';
import { fetchPatients, addPatient } from '../api';

function usePatients() {
    const { data, isLoading, error } = useQuery('patients', fetchPatients);

    const addPatientMutation = useMutation(addPatient);

    const addPatientHandler = async (data) => {
        try {
            await addPatientMutation.mutateAsync(data);
        } catch (err) {
            console.log(err);
        }
    };

    return {
        patients: data,
        isLoading,
        error,
        addPatientHandler,
    };
}