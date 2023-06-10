import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NotFoundPage from "../home/NotFoundPage";
import { usePatients } from "../../hooks/usePatients";
import { useDoctor } from "../../hooks/useDoctors";
import { useAppointments } from "../../hooks/useAppointments";
import { usePatientPrescriptions } from "../../hooks/usePrescriptions";
import { usePatientHealthData } from "../../hooks/useHealth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../../hooks/useAuth";
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import {
    faHeartbeat,
    faBed,
    faRunning,
    faTint,
    faPills,
    faCalendarAlt,

} from "@fortawesome/free-solid-svg-icons";
import { FaComment, FaUserEdit } from "react-icons/fa";
import { getOrCreateChat } from 'react-chat-engine';
import "../styles/PatientProfile.css";


// TODO: Add the following to the patient profile page:
// TODO 1. Patient info ( weight, height, image)
// TODO 2. if current user is doctor, add a button to add a prescription
// TODO 3. patient edit page
const PatientProfile = () => {

    const { id } = useParams();
    const { user } = useAuth();
    const [currentUser, setCurrentUser] = useState(
        {
            doctor: "",
            patient: ""
        }
    );
    useState(() => {
        if (user) {
            setCurrentUser(user);
        }
    }, [user]);
    const { doctor } = useDoctor(currentUser.doctor);
    const { patients, isLoading: PatientLoading } = usePatients();
    const { appointments, isLoading: AppointmentsLoading } = useAppointments();
    const { prescriptions, isLoading: PrescriptionsLoading } = usePatientPrescriptions(id);
    const { healthData, isLoading: HealthDataLoading } = usePatientHealthData(id);

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
            // const currentDate = new Date();
            // const filteredMedications = prescriptions.filter(
            //     (prescription) => new Date(prescription.refillDate) >= currentDate
            // );
            setCurrentMedications(prescriptions);
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

    const mockHealthData = [
        // heartRate sleep steps bloodPressure
        {
            date: "2021-05-01",
            type: "heartRate",
            value: 80
        },
        {
            date: "2021-05-01",
            type: "sleep",
            value: 8
        },
        {
            date: "2021-05-01",
            type: "steps",
            value: 10000
        },
        {
            date: "2021-05-01",
            type: "bloodPressure",
            value: 120
        },
    ];


    if (!patient && !PatientLoading) {
        return <NotFoundPage />;
    }
    if (!currentUser && !patient) {
        return <div className="loading-animation" />;
    }

    console.log("currentUser", currentUser);
    const handleMessage = () => {
        try {
            getOrCreateChat(
                {
                    userName: patient.firstName + " " + patient.lastName,
                    userSecret: user.password,
                    email: user.email,
                    projectID: "05e8fe9c-bf36-496a-bf00-1c5bfd1daa81",
                },
                {
                    is_direct_chat: true,
                    usernames: [doctor.firstName + " " + doctor.lastName, patient.firstName + " " + patient.lastName],
                },
            );
        } catch (err) {
            console.log(err.message);
        }
    }
    return (
        <div className="grid grid-cols-2 shadow-lg shadow-sky rounded-lg m-40 ">
            {(!patient && !currentUser && PatientLoading) ? (<div className="loading-animation" />) :
                (<section className=" border row-span-2 p-5">
                    {/* Display patient info */}
                    {PatientLoading ? (
                        <div className="loading-animation" />
                    ) : (
                        <div className="flex w-full">
                            <div className="flex flex-col  w-3/4  border-r">
                                {/* complete the patient info here */}
                                <img src={process.env.PUBLIC_URL + '/uploads/' + patient.profilePicture} alt="Doctor"
                                    className="rounded-full  w-40 h-40 mx-auto mb-5 object-cover border-2 border-grey-400"
                                />
                                <div className="flex flex-col ml-4">
                                    <h3 className="text-4xl text-center font-bold text-gray-600 pb-6">{patient.firstName} {patient.lastName}</h3>
                                    <div className="grid grid-cols-2 mt-2 ">
                                        <div>
                                            <h3 className="text-sm font-bold text-gray-400 text-center">DOB</h3>
                                            <p className="text-xl font-bold text-gray-500 text-center">{new Date(patient.dateOfBirth).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-gray-400 text-center">Age</h3>
                                            <p className="text-xl font-bold text-gray-500 text-center">{new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()}y</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 mt-2">
                                        <div>
                                            <h3 className="text-sm font-bold text-gray-400 text-center">Weight</h3>
                                            <p className="text-xl font-bold text-gray-500 text-center">{patient.weight} kg</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-gray-400 text-center">Height</h3>
                                            <p className="text-xl font-bold text-gray-500 text-center">{patient.height} cm</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Message Button if currentuser not owner of profile */}
                                {currentUser.isDoctor && (
                                    <button className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 mr-6 ml-8"
                                        onClick={handleMessage}>
                                        <FaComment className="mr-2" />
                                        Message
                                    </button>)}
                                {patient._id === currentUser.patient && (
                                    <div className="flex flex-col text-center">
                                        <Link
                                            to={`/patient/${id}/edit`}
                                            className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 mr-6 ml-8"
                                        >
                                            <FaUserEdit className="mr-2" />
                                            Edit Profile
                                        </Link>
                                    </div>
                                ) }

                            </div>
                            <div className="mr-10 ml-10">
                                <div className="pb-7">
                                    <h3 className="text-sm font-bold text-gray-400">Home Address</h3>
                                    <p className="text-xl font-bold text-gray-500">{patient.address}</p>
                                </div>
                                <div className="pb-7">
                                    <h3 className="text-sm font-bold text-gray-400">Phone</h3>
                                    <p className="text-xl font-bold text-gray-500">{patient.phone}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </section>)}

            <section className="border p-5">
                <div className="">
                    <h2 className="text-2xl font-bold text-gray-500 border-b pb-4">Current Medications</h2>
                    {PrescriptionsLoading ? (
                        <div className="loading-animation" />
                    ) : (
                        <>
                            {currentMedications.length === 0 ? (
                                <p className="text-xl font-bold text-gray-500 text-center">No current medications.</p>
                            ) : (
                                <ul className=" flex flex-col mt-4">
                                    {currentMedications.map((prescription) => (
                                        <li key={prescription._id} className="flex items-center">
                                            <span className=" text-4xl text-sky-600 ml-2 mr-2">
                                                <FontAwesomeIcon icon={faPills} />
                                            </span>
                                            <span className="text-4xl text-gray-500 font-semibold">{prescription.medication}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </>
                    )}
                </div>
            </section>

            <section className="border p-5">
                <div className="flex flex-col ">
                    <h2 className=" text-2xl font-bold text-gray-500 border-b pb-4">Vitals</h2>
                    {!mockHealthData ? (
                        <div className="loading-animation" />
                    ) : (
                        <>
                            {mockHealthData.length === 0 ? (
                                <p className="text-xl font-bold text-gray-500 text-center">No vitals data available.</p>
                            ) : (
                                <div className="flex self-center mt-4 space-x-4 items-center justify-items-center">
                                    {mockHealthData.map((vital) => (
                                        <div key={vital._id} className="text-center">
                                            <div className="text-7xl text-sky-600">
                                                {vital.type === "heartRate" && <FontAwesomeIcon icon={faHeartbeat} />}
                                                {vital.type === "sleep" && <FontAwesomeIcon icon={faBed} />}
                                                {vital.type === "steps" && <FontAwesomeIcon icon={faRunning} />}
                                                {vital.type === "bloodPressure" && <FontAwesomeIcon icon={faTint} />}
                                            </div>
                                            <h3 className="text-md font-bold text-gray-400">{vital.type}</h3>
                                            {vital.type === "bloodPressure" && (
                                                <p className="text-2xl font-bold text-gray-500">
                                                    {vital.value} mmHg
                                                </p>
                                            )}
                                            {vital.type === "heartRate" && (
                                                <p className="text-2xl font-bold text-gray-500">
                                                    {vital.value} bpm
                                                </p>
                                            )}
                                            {vital.type === "sleep" && (
                                                <p className="text-2xl font-bold text-gray-500">
                                                    {vital.value} hrs
                                                </p>
                                            )}
                                            {vital.type === "steps" && (
                                                <p className="text-2xl font-bold text-gray-500">
                                                    {vital.value} steps
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
            <section className="border p-5 col-span-2">
                <div className="PatientAppointments">
                    <h2 className="text-3xl font-bold text-gray-500 border-b pb-4 pl-10">Appointments</h2>
                    {AppointmentsLoading ? (
                        <div className="loading-animation"></div>
                    ) : (
                        <>
                            {patientAppointments.length === 0 ? (
                                <p className="text-xl font-bold text-gray-500 text-center">No appointments found.</p>
                            ) : (
                                <Table className="appointments-table mt-4">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className=""></TableCell>
                                            <TableCell className="text-gray-400 text-xl font-bold">Date</TableCell>
                                            <TableCell className="text-gray-400 text-xl font-bold">Time</TableCell>
                                            <TableCell className="text-gray-400 text-xl font-bold">Details</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {patientAppointments.map((appointment, index) => (
                                            <TableRow key={appointment._id}>
                                                <TableCell>
                                                    <span className=" text-4xl text-sky-600 ml-2 mr-2">
                                                        <FontAwesomeIcon icon={faCalendarAlt} />
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-gray-500 text-xl font-bold">
                                                    {new Date(appointment.startTime).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell className="text-gray-500 text-xl font-bold">
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
                                                </TableCell>
                                                <TableCell className="text-gray-500 text-xl font-bold">{appointment.details}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    );
};

export default PatientProfile;
