// Patient Schema
// firstName: (String, required) first name of the patient
// lastName: (String, required) last name of the patient
// dateOfBirth: (Date, required) date of birth of the patient
// gender: (String, enum: ['male', 'female', 'other'], required) gender of the patient
// phone: (String, required) phone number of the patient
// address: (String, required) address of the patient
// appointments: (Array of ObjectId, ref: 'Appointment') array of references to appointments associated with the patient
// reminders: (Array of ObjectId, ref: 'Reminder') array of references to reminders associated with the patient
// healthData: (Array of ObjectId, ref: 'HealthData') array of references to health data associated with the patient

// Appointment Schema
// doctor: (ObjectId, ref: 'Doctor', required) reference to the doctor associated with the appointment
// patient: (ObjectId, ref: 'Patient', required) reference to the patient associated with the appointment
// startTime: (Date, required) start time of the appointment
// endTime: (Date, required) end time of the appointment
// reason: (String, required) reason for the appointment

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFoundPage from "../home/NotFoundPage";
import { usePatients } from "../../hooks/usePatients";
import { useAppointments } from "../../hooks/useAppointments";
import "../styles/PatientProfile.css"

const PatientProfile = () => {
    //get id from url
    const { id } = useParams();
    //get patient data
    const { patients, isLoading: PatientLoading, error: PatientError } = usePatients();
    //get appointment data
    const { appointments, isLoading: AppointmentsLoading, error: AppointmentsError } = useAppointments();
    console.log(patients);
    //set patient data
    const [patient, setPatient] = useState(null);
    console.log("CurrentPatient: ",patient)
    const [patientAppointments, setPatientAppointments] = useState([])
    console.log("CurrentAppointments: ",patientAppointments)

    //get patient data
    useEffect(() => {
        if (patients) {
            const patient = patients.find((patient) => patient._id === id);
            setPatient(patient);
        }
    }, [patients, id]);
    //get appointment data
    useEffect(() => {
        if (appointments) {
            const patientAppointments = appointments.filter((appointment) => appointment.patient === id);
            setPatientAppointments(patientAppointments)
        }
    }, [appointments, id]);



    if (!patient && !PatientLoading) {
        return <NotFoundPage />;
    }
    return (
        <div className="container">
            <div className="PatientInfo">
                {/* display patient info */}
                {PatientLoading ? (<div>Loading...</div>) :
                    (<>
                        <div className="PatientImage">
                            <img
                            src=""
                            alt="Patient"
                            />
                        </div>
                        <div className="PatientName">
                            <h1>{patient.firstName} {patient.lastName}</h1>
                        </div>
                        <div className="PatientDOB">
                            <h3>Date of Birth:  {new Date(patient.dateOfBirth).getFullYear()}
                                -
                                {new Date(patient.dateOfBirth).getMonth() + 1}
                                -
                                {new Date(patient.dateOfBirth).getDate()}
                            </h3>
                        </div>
                        <div className="PatientGender">
                            <h3>
                                Gender: {patient.gender}
                            </h3>
                        </div>
                        <div className="PatientPhone">
                            <h3>
                                Phone: {patient.phone}
                            </h3>
                        </div>
                        <div className="PatientAddress">
                            <h3>
                                Address: {patient.address}
                            </h3>
                        </div>
                    </>)}
            </div>
            <div className="PatientAppointments">
                <h2>Appointments</h2>
                {AppointmentsLoading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        {patientAppointments.length === 0  ? (
                            <p>No appointments found.</p>
                        ) : (
                            <ul>
                                {patientAppointments.map((appointment) => (
                                    <li key={appointment._id}>
                                        <div>
                                            <h3>{appointment.reason}</h3>
                                            <p>
                                                Date:{" "}
                                                {new Date(appointment.startTime).toLocaleDateString()}
                                            </p>
                                            <p>
                                                Time:{" "}
                                                {new Date(appointment.startTime).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: true,
                                                })}
                                                -{" "}
                                                {new Date(appointment.endTime).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: true,
                                                })}
                                            </p>
                                            <p>Details: {appointment.details}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                )}
            </div>
            <div className="PatientPrescriptions">
            </div>
            <div className="PatientVitals">
            </div>
        </div>
    )
}

export default PatientProfile;