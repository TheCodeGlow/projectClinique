import { useMutation } from 'react-query';

const API_URL = 'http://localhost:5000/api';

// <---------------------------------------------->
export const fetchDoctors = async () => {
    const response = await fetch(`${API_URL}/doctors`);
    const data = await response.json();
    return data;
}

export const fetchPatientRecords = async (id) => {
    const response = await fetch(`${API_URL}/patient-records/${id}`);
    const data = await response.json();
    return data;
}


export const fetchRemoteConsultation = async (id) => {
    const response = await fetch(`${API_URL}/remote-consultations/${id}`);
    const data = await response.json();
    return data;
}

export const addRemoteConsultation = async (remoteConsultation) => {
    const response = await fetch(`${API_URL}/remote-consultations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(remoteConsultation),
    });
    const data = await response.json();
    return data;
}

// hook: usePatients
export const fetchPatients = async (id) => {
    const response = await fetch(`${API_URL}/patients/${id}`);
    const data = await response.json();
    return data;
}

export const addPatient = async (patient) => {
    const response = await fetch(`${API_URL}/patients`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(patient),
    });
    const data = await response.json();
    return data;
}

// hook: usePrescriptions
export const fetchPrescriptions = async (id) => {
    const response = await fetch(`${API_URL}/prescriptions/${id}`);
    const data = await response.json();
    return data;
}

export const addPrescription = async (prescription) => {
    const response = await fetch(`${API_URL}/prescriptions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(prescription),
    });
    const data = await response.json();
    return data;
}

export const fetchAppointments = async (id) => {
    const response = await fetch(`${API_URL}/appointments?id=${id}`);
    const data = await response.json();
    return data;
};

export const addAppointment = async (appointment) => {
    const response = await fetch(`${API_URL}/appointments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointment),
    });
    const data = await response.json();
    return data;
};

//show list of api endpoints used
// route : /api/doctors
// route : /api/patients
// route : /api/patient-records/:id
// route : /api/remote-consultations/:id
// route : /api/prescriptions/:id
// route : /api/appointments?id=${id}
// route : /api/login
// route : /api/register
// route : /api/remote-consultations
// route : /api/prescriptions
// route : /api/appointments
// route : /api/patient-records
// route : /api/patients
