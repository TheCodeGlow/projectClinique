import { useQuery } from 'react-query';
import { fetchPatientRecords } from '../api';

function usePatientRecords() {
    const { isLoading, error, data } = useQuery('patientRecords', fetchPatientRecords);

    return {
        isLoading,
        error,
        patientRecords: data ? data.patientRecords : [],
    };
}

export default usePatientRecords;
