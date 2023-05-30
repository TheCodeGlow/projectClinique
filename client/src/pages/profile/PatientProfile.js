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

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFoundPage from "../home/NotFoundPage";
import { usePatients } from "../../hooks/usePatients";

const PatientProfile = () => {
    //get id from url
    const { id } = useParams();
    //get patient data
    const { patients, isLoading, error } = usePatients();
    console.log(patients);
    //set patient data
    const [patient, setPatient] = useState(null);

    //get patient data
    useEffect(() => {
        if (patients) {
            const patient = patients.find((patient) => patient._id === id);
            setPatient(patient);
        }
    }, [patients, id]);

    //if loading
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (!patient) {
        return <NotFoundPage />;
    }
    return (
        <div className="container">
            <div className="PatientInfo">
                {/* display patient info */}
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

            </div>
            <div className="PatientReminders">

            </div>
            <div className="PatientPrescriptions">
            </div>
            <div className="PatientVitals">
            </div>
        </div>
    )
}

export default PatientProfile;