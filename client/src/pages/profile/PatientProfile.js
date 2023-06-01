import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFoundPage from "../home/NotFoundPage";
import { usePatients } from "../../hooks/usePatients";
import { useAppointments } from "../../hooks/useAppointments";
import { usePatientPrescriptions } from "../../hooks/usePrescriptions";
import { usePatientHealthData } from "../../hooks/useHealth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeartbeat,
    faBed,
    faRunning,
    faTint,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/PatientProfile.css";

const PatientProfile = () => {
    const { id } = useParams();
    const { patients, isLoading: PatientLoading } = usePatients();
    const { appointments, isLoading: AppointmentsLoading } = useAppointments();
    const { prescriptions, isLoading: PrescriptionsLoading } = usePatientPrescriptions(id);
    const { healthData, isLoading: HealthDataLoading} = usePatientHealthData(id);

    const [patient, setPatient] = useState(null);
    const [patientAppointments, setPatientAppointments] = useState([]);
    const [currentMedications, setCurrentMedications] = useState([]);
    const [currentHealthData, setCurrentHealthData] = useState([]);

    useEffect(() => {
        if (patients) {
            const patient = patients.find((patient) => patient._id === id);
            setPatient(patient);
        }
    }, [patients, id]);

    useEffect(() => {
        if (appointments) {
            const patientAppointments = appointments.filter((appointment) => appointment.patient === id);
            setPatientAppointments(patientAppointments);
        }
    }, [appointments, id]);

    //get current patient medications
    useEffect(() => {
        if (prescriptions) {
            const currentDate = new Date();
            const filteredMedications = prescriptions.filter(
                (prescription) => new Date(prescription.refillDate) >= currentDate
            );
            setCurrentMedications(filteredMedications);
        }
    }, [prescriptions]);

    //get current patient health data
    useEffect(() => {
        if (healthData) {
            const currentDate = new Date();
            const filteredHealthData = healthData.filter((data) => new Date(data.date) >= currentDate);
            setCurrentHealthData(filteredHealthData);
        }
    }, [healthData]);




    if (!patient && !PatientLoading) {
        return <NotFoundPage />;
    }

    return (
        <div className="container">
            <section className="patientInfo_section">
                {/* Display patient info */}
                {PatientLoading ? (
                    <div className="loading-animation" />
                ) : (
                    <div className="information">
                        <div className="first-column">
                            {/* complete the patient info here */}
                            <img src={patient.profilePicture} className="profile-picture" alt="Profile" />
                            <div >
                                <h3>{patient.firstName} {patient.lastName}</h3>
                            </div>
                            <div >
                                <div>
                                    <h3>Date of Birth</h3>
                                    <p>{new Date(patient.dateOfBirth).toLocaleDateString()}</p>
                                </div>
                                <div >
                                    <h3>Age</h3>
                                    <p>{new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()}</p>
                                </div>
                            </div>
                            <div >
                                <div>
                                    <h3>Weight</h3>
                                    <p>{patient.weight} kg</p>
                                </div>
                                <div >
                                    <h3>Height</h3>
                                    <p>{patient.height} cm</p>
                                </div>
                            </div>
                        </div>
                        <div >
                            <div>
                                <h3>Phone</h3>
                                <p>{patient.phone}</p>
                            </div>
                            <div>
                                <h3>Address</h3>
                                <p>{patient.address}</p>
                            </div>
                            <div>
                                <h3>Gender</h3>
                                <p>{patient.gender}</p>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            <section className="appointments_section">
                <div className="PatientAppointments">
                    <h2>Appointments</h2>
                    {AppointmentsLoading ? (
                        <div className="loading-animation"></div>
                    ) : (
                        <>
                            {patientAppointments.length === 0 ? (
                                <p>No appointments found.</p>
                            ) : (
                                <table className="appointments-table">
                                    <thead>
                                        <tr>
                                            <th>Num</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {patientAppointments.map((appointment) => (
                                            <tr key={appointment._id}>
                                                <td>{patientAppointments.indexOf(appointment) + 1}</td>
                                                <td>{new Date(appointment.startTime).toLocaleDateString()}</td>
                                                <td>
                                                    {new Date(appointment.startTime).toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: true,
                                                    })} -{" "}
                                                    {new Date(appointment.endTime).toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: true,
                                                    })}
                                                </td>
                                                <td>{appointment.details}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </>
                    )}
                </div>
            </section>

            <section className="currentMeds_section">
                <div className="PatientMedications">
                    <h2>Current Medications</h2>
                    {PrescriptionsLoading ? (
                        <div className="loading-animation" />
                    ) : (
                        <>
                            {currentMedications.length === 0 ? (
                                <p>No current medications.</p>
                            ) : (
                                <ul className="medications-list">
                                    {currentMedications.map((prescription) => (
                                        <li key={prescription._id}>
                                            <span className="medication-icon">[Pill Icon]</span>
                                            <span className="medication-name">{prescription.medication}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </>
                    )}
                </div>
            </section>

            <section className="healthData_section">
                <div className="PatientVitals">
                    <h2>Vitals</h2>
                    {HealthDataLoading ? (
                        <div className="loading-animation" />
                    ) : (
                        <>
                            {currentHealthData.length === 0 ? (
                                <p>No vitals data available.</p>
                            ) : (
                                <table className="vitals-table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Type</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentHealthData.map((vital) => (
                                            <tr key={vital._id}>
                                                <td>{new Date(vital.date).toLocaleDateString()}</td>
                                                <td>
                                                    {vital.type === "heartRate" && <FontAwesomeIcon icon={faHeartbeat} />}
                                                    {vital.type === "sleep" && <FontAwesomeIcon icon={faBed} />}
                                                    {vital.type === "steps" && <FontAwesomeIcon icon={faRunning} />}
                                                    {vital.type === "bloodPressure" && <FontAwesomeIcon icon={faTint} />}
                                                </td>
                                                <td>{vital.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    );
};

export default PatientProfile;
