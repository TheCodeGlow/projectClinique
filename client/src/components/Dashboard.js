import React from "react";

import { useDoctors } from "../hooks/useDoctors";
import { useAppointments} from "../hooks/useAppointments"
import { usePatients } from "../hooks/usePatients"
import useAuth from "../hooks/useAuth";


function Dashboard(){

// if logged in call hooks
const { user } = useAuth();


const { data: doctors, error: doctorsError, isLoading: doctorsLoading } = useDoctors();
const { data: appointments, error: appointmentsError, isLoading: appointmentsLoading } = useAppointments();
const { data: patients, error: PatientError, isLoading: PatientLoadin } = usePatients();     

if (user.type === 'doctor') {
    // Doctor view
    // const doctorAppointments = appointments.filter(appointment => appointment.doctorId === user.id);
    // const doctorPatients = patients.filter(patient => patient.doctorId === user.id);

    return (
        <div>
            <h1>Welcome, Dr. {user.name}!</h1>
            <h2>Your Appointments:</h2>
            {/* <ul>
                {doctorAppointments.map(appointment => (
                    <li key={appointment.id}>
                        {appointment.startTime} - {appointment.endTime}: {appointment.patientName}
                    </li>
                ))}
            </ul> */}
            <h2>Your Patients:</h2>
            {/* <ul>
                {doctorPatients.map(patient => (
                    <li key={patient.id}>{patient.name}</li>
                ))}
            </ul> */}
        </div>
    );
} else {
    // Patient view
    // const patientAppointments = appointments.filter(appointment => appointment.patientId === user.id);
    // const patientDoctors = doctors.filter(doctor => doctor.patientIds.includes(user.id));

    return (
        <div>
            <h1>Welcome, {user.name}!</h1>
            <h2>Your Appointments:</h2>
            {/* <ul>
                {patientAppointments.map(appointment => (
                    <li key={appointment.id}>
                        {appointment.startTime} - {appointment.endTime}: Dr. {appointment.doctorName}
                    </li>
                ))}
            </ul> */}
            <h2>Your Doctors:</h2>
            {/* <ul>
                {patientDoctors.map(doctor => (
                    <li key={doctor.id}>{doctor.name}</li>
                ))}
            </ul> */}
            <h2>All Doctors:</h2>
            {/* <ul>
                {doctors.map(doctor => (
                    <li key={doctor.id}>{doctor.name}</li>
                ))}
            </ul> */}
        </div>
    );
}
}

export default Dashboard;