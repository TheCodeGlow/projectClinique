import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//import custom hooks
import useAuth from '../../hooks/useAuth';
import { usePatients } from '../../hooks/usePatients';
import { useAppointments } from '../../hooks/useAppointments';
import { usePatientPrescriptions } from '../../hooks/usePrescriptions';
import { useDoctor } from '../../hooks/useDoctors';

//import components
import { Link } from 'react-router-dom';
import DoctorAppointment from '../../components/profile/DoctorAppointment';
import {
    TextField,
} from '@material-ui/core';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { FaUserEdit, FaComment, FaArrowRight } from 'react-icons/fa';
import "../styles/DoctorProfile.css"


// TODO LIST:
// DONE 1. Complete the Edit Page for doctor
// TODO 2. add doctor rewiews
// TODO 3. add doctor rating
// TODO 4. add message functionality
// TODO 5. add prescription page that contains all info about the prescription as well as update/delete functionality

const DoctorProfile = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const { patients } = usePatients();
    const { appointments } = useAppointments();
    const { prescriptions } = usePatientPrescriptions(id);
    const { doctor, isLoading } = useDoctor(id);

    // Booking appointment section logic
    const [patient, setPatient] = useState('');

    useEffect(() => {
        if (user && !user.isDoctor) {
            setPatient(user._id);
        }
    }, [user]);
    // patient list section logic
    const [patientList, setPatientList] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredPatients, setFilteredPatients] = useState([]);

    useEffect(() => {
        if (patients && appointments && doctor) {
            // get all patients that have an appointment with the doctor
            const patientIds = appointments
                .filter((appointment) => appointment.doctor === doctor._id)
                .map((appointment) => appointment.patient);
            // get all patients that have an appointment with the doctor
            const patientList = patients.filter((patient) =>
                patientIds.includes(patient._id)
            );
            setPatientList(patientList);
        }
    }, [patients, appointments, doctor]);

    useEffect(() => {
        if (patientList && search && patients) {
            setFilteredPatients(
                patientList.filter((patient) =>
                    patient.firstName.toLowerCase().includes(search.toLowerCase())
                )
            );
        } else {
            setFilteredPatients(patientList);
        }
    }, [search, patientList, patients]);

    // appointment list section logic
    const [appointmentList, setAppointmentList] = useState([]);
    const [searchAppointment, setSearchAppointment] = useState('');
    const [filteredAppointments, setFilteredAppointments] = useState(null);

    useEffect(() => {
        if (appointments && doctor && patients && user) {
            // get all appointments that have the doctor
            const appointmentList = appointments.filter((appointment) =>
                appointment.doctor === doctor._id
            );


            // add patient info to each appointment
            appointmentList.forEach((appointment) => {
                const patient = patients.find(
                    (patient) => patient._id === appointment.patient
                );
                if (patient) { appointment.patient = patient; }

            });
            // filter today's appointments
            const today = new Date();
            const todayAppointments = appointmentList.filter(
                (appointment) =>
                    new Date(appointment.startTime).getDate() === today.getDate() &&
                    new Date(appointment.startTime).getMonth() === today.getMonth() &&
                    new Date(appointment.startTime).getFullYear() === today.getFullYear()
            );
            // add time and date to each appointment
            todayAppointments.forEach((appointment) => {
                const startTime = new Date(appointment.startTime);
                const endTime = new Date(appointment.endTime);
                appointment.time = `${startTime.getHours()}:${startTime.getMinutes()}-${endTime.getHours()}:${endTime.getMinutes()}`;
                appointment.date = `${startTime.getDate()}/${startTime.getMonth()}/${startTime.getFullYear()}`;
            });
            // if the user is a patient, filter only his appointments
            if (user && !user.isDoctor) {
                const patientAppointments = todayAppointments.filter(
                    (appointment) => appointment.patient._id === user._id
                );
                setAppointmentList(patientAppointments);
            } else setAppointmentList(todayAppointments);
        }
    }, [appointments, doctor, patients, user]);

    useEffect(() => {
        if (appointmentList && searchAppointment && patients) {
            setFilteredAppointments(
                appointmentList.filter((appointment) =>
                    appointment.patient.firstName
                        .toLowerCase()
                        .includes(searchAppointment.toLowerCase())
                )
            );
        } else {
            setFilteredAppointments(appointmentList);
        }
    }, [searchAppointment, appointmentList, patients]);

    // prescription list section
    const [prescriptionList, setPrescriptionList] = useState([]);
    const [searchPrescription, setSearchPrescription] = useState('');
    const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);

    useEffect(() => {
        if (prescriptions) {
            setPrescriptionList(prescriptions);
        }
    }, [prescriptions]);

    useEffect(() => {
        if (prescriptionList && searchPrescription && patients) {
            setFilteredPrescriptions(
                prescriptionList.filter((prescription) =>
                    prescription.patient.firstName
                        .toLowerCase()
                        .includes(searchPrescription.toLowerCase())
                )
            );
        } else {
            setFilteredPrescriptions(prescriptionList);
        }
    }, [searchPrescription, prescriptionList, patients]);



    if (isLoading) return (
        //loading
        <div className="flex justify-center items-center h-screen">
            <h1 className="text-3xl font-bold text-gray-800">Loading...</h1>
        </div>
    );

    console.log("filteredAppointments! ", filteredAppointments);

    return (
        <main className='grid grid-cols-2 shadow-lg shadow-blue rounded-lg m-40' >
            {/* doctor info section */}
            {(!isLoading && doctor && user) ? (
                <section className="flex flex-col border p-20 col-span-2 ">
                    <img src={process.env.PUBLIC_URL + '/uploads/' + doctor.profilePicture} alt="Doctor"
                        className="rounded-full w-80 h-80 mx-auto mb-5 object-cover border-2 border-gray-300"
                    />
                    <div>
                        <h2 className="text-4xl font-bold text-gray-600 text-center">
                            Dr.{doctor?.firstName} {doctor?.lastName}
                        </h2>
                        <h3 className="text-xl text-gray-600 font-semibold text-center">{doctor?.specialty}</h3>
                        <p className="text-gray-500 font-semibold text-center mt-6">
                            {doctor?.bio}
                        </p>

                    </div>
                    {user.doctor === id ? (
                        <div className="flex flex-col text-center">
                            <Link
                                to={`/doctor/${id}/edit`}
                                className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
                            >
                                <FaUserEdit className="mr-2" />
                                Edit Profile
                            </Link>
                        </div>
                    ) : (
                        <button className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">
                            <FaComment className="mr-2" />
                            Message
                        </button>
                    )}
                </section>
            ) : (
                <section className="flex flex-col border p-20 col-span-2 ">
                    <div className="flex justify-center items-center h-screen">
                        <h1 className="text-3xl font-bold text-gray-800">Loading...</h1>
                    </div>
                </section>
            )}
            {/* Booking appointment section */}
            {(!isLoading && doctor && patients && user) ? (
                <section className="flex flex-col bg-white border p-20 col-span-2 ">
                    <h2 className="text-2xl font-bold text-gray-500 text-center">
                        Book an Appointment
                    </h2>
                    {/* if user is owner of profile add dropdown containnng patients */}
                    {user.doctor === id && (
                        <div className="flex flex-col items-center  justify-center mt-5">
                            <label htmlFor="patient" className="mr-2 text-xl text-gray-600">
                                Select Patient
                            </label>
                            <select
                                name="patient"
                                id="patient"
                                value={patient}
                                onChange={(e) => setPatient(e.target.value)}
                                className="px-2 py-1 border rounded text-center font-bold focus:outline-none focus:ring focus:border-blue-300"
                            >
                                <option value="">Select Patient</option>
                                {patients?.map((patient) => (
                                    <option key={patient._id} value={patient._id} className='font-bold text-start'>
                                        - {patient.firstName} {patient.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div className="flex flex-col items-center mt-5 border p-5 rounded-lg overflow-x-hidden">
                        <DoctorAppointment idPatient={patient} idDoctor={id} />
                    </div>
                </section>
            ) : (
                <section className="flex flex-col bg-white border p-20 col-span-2 ">
                    <div className="flex justify-center items-center h-screen">
                        <h1 className="text-3xl font-bold text-gray-800">Loading...</h1>
                    </div>
                </section>
            )}

            {/* patient list section */}
            {(!isLoading && doctor && patients) ? (
                <section className="flex flex-col bg-white border p-20 ">
                    <h2 className="text-2xl font-bold text-center text-gray-500 mb-5">
                        Patients
                    </h2>
                    <div className="flex flex-col overflow-y-auto h-80 ">
                        <TextField label="Search" value={search} onChange={(e) => setSearch(e.target.value)} className=" bg-white border w-full md:w-auto" />
                        <ul className="">
                            {filteredPatients?.map((patient) => (<li key={patient._id} className="flex items-center bg-white p-6 space-5 border hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                                <div>
                                    <img src={process.env.PUBLIC_URL + '/uploads/' + patient.profilePicture} alt="Patient" className="w-10 h-10 mr-5 border rounded-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-lg text-gray-800">
                                        {patient.firstName} {patient.lastName}
                                    </h3>
                                </div>
                                <Link to={`/patient/${patient._id}`} className="ml-auto">
                                    <FaArrowRight className="text-gray-500" />
                                </Link>
                            </li>))}
                        </ul>
                    </div>
                </section>
            ) : (
                <section className="flex flex-col bg-white border p-20 ">
                    <div className="flex justify-center items-center h-screen">
                        <h1 className="text-3xl font-bold text-gray-800">Loading...</h1>
                    </div>
                </section>
            )}
            {/* prescription list section */}
            {(!isLoading && doctor && patients) ? (
                <section className="flex flex-col overflow-hidden space-x-4 bg-white border p-20 overflow-y-auto">
                    <h2 className="text-2xl font-bold text-center text-gray-500 mb-5">
                        Prescriptions
                    </h2>
                    <div className="flex flex-col overflow-y-auto h-80 ">
                        <TextField label="Search" value={searchPrescription} onChange={(e) => setSearchPrescription(e.target.value)} className=" bg-white border w-full md:w-auto" />
                        <ul className="">
                            {filteredPrescriptions?.map((prescription) => (<li key={prescription._id} className="flex items-center bg-white p-6 space-5 border hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                                <div>

                                    <img src={prescription.patient.image} alt="Patient" className="w-10 h-10 border rounded-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-lg text-gray-800">
                                        {prescription.patient.firstName} {prescription.patient.lastName}
                                    </h3>
                                </div>
                            </li>))}
                        </ul>
                    </div>
                </section>
            ) : (
                <section className="flex flex-col overflow-hidden space-x-4 bg-white border p-20 overflow-y-auto">
                    <div className="flex justify-center items-center h-screen">
                        <h1 className="text-3xl font-bold text-gray-800">Loading...</h1>
                    </div>
                </section>
            )}

            {/* appointment list section */}
            {(!isLoading && doctor && appointments && patients && filteredAppointments) ? (
                <section className="flex flex-col space-x-4 bg-white p-5 col-span-2 border overflow-y-auto ">
                    <h2 className="text-2xl font-bold text-center text-gray-500 mb-5">
                        Today's appointments
                    </h2>
                    <div className="flex flex-col overflow-y-auto h-80 ">
                        <TextField label="Search" value={searchAppointment} onChange={(e) => setSearchAppointment(e.target.value)} className=" bg-white border w-full md:w-auto" />
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className="text-gray-400 text-xl font-bold">Name</TableCell>
                                    <TableCell className="text-gray-400 text-xl font-bold">Date</TableCell>
                                    <TableCell className="text-gray-400 text-xl font-bold">Time</TableCell>
                                    <TableCell className="text-gray-400 text-xl font-bold">Details</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredAppointments.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-gray-500 text-xl font-bold">
                                            No appointments found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredAppointments.map((appointment) => (
                                        appointment.patient ? (
                                            <TableRow key={appointment._id} className="text-gray-500 text-xl font-bold">
                                                <TableCell>
                                                    {appointment.patient.firstName + " " + appointment.patient.lastName}
                                                </TableCell>
                                                <TableCell>{appointment.date}</TableCell>
                                                <TableCell>{appointment.time}</TableCell>
                                                <TableCell>{appointment.details}</TableCell>
                                            </TableRow>
                                        ) : null
                                    ))
                                )}

                            </TableBody>
                        </Table>
                    </div>
                </section>
            ) : (
                <section className="flex flex-col space-x-4 bg-white p-5 col-span-2 border overflow-y-auto ">
                    <div className="flex justify-center items-center h-screen">
                        <h1 className="text-3xl font-bold text-gray-800">Loading...</h1>
                    </div>
                </section>
            )}
        </main>
    );
};

export default DoctorProfile;