import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//import custom hooks
import useAuth from '../../hooks/useAuth';
import { usePatients } from '../../hooks/usePatients';
import { useAppointments } from '../../hooks/useAppointments';
import { usePatientPrescriptions } from '../../hooks/usePrescriptions';
import { useDoctor } from '../../hooks/useDoctors';

//import components
import AppointmentRow from '../../components/dashboard/AppointmentRow';
import { Link } from 'react-router-dom';
import DoctorAppointment from '../../components/profile/DoctorAppointment';
import {
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@material-ui/core';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { FaUserEdit, FaComment, FaArrowRight } from 'react-icons/fa';
import "../styles/DoctorProfile.css"



const DoctorProfile = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const { patients } = usePatients();
    const { appointments } = useAppointments();
    const { prescriptions } = usePatientPrescriptions(id);
    const { doctor } = useDoctor(id);


    // Booking appointment section logic
    const [patient, setPatient] = useState('');
    if (user && !user.isDoctor) {
        setPatient(user._id);
    }
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
        if (patientList && search) {
            setFilteredPatients(
                patientList.filter((patient) =>
                    patient.firstName.toLowerCase().includes(search.toLowerCase())
                )
            );
        } else {
            setFilteredPatients(patientList);
        }
    }, [search, patientList]);

    // appointment list section logic
    const [appointmentList, setAppointmentList] = useState([]);
    const [searchAppointment, setSearchAppointment] = useState('');
    const [filteredAppointments, setFilteredAppointments] = useState([]);

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
                appointment.patient = patient;
            });
            // filter today's appointments
            const today = new Date();
            const todayAppointments = appointmentList.filter(
                (appointment) =>
                    new Date(appointment.startTime).getDate() === today.getDate() &&
                    new Date(appointment.startTime).getMonth() === today.getMonth() &&
                    new Date(appointment.startTime).getFullYear() === today.getFullYear()
            );
            // if the user is a patient, filter only his appointments
            if (!user.isDoctor) {
                const patientAppointments = todayAppointments.filter(
                    (appointment) => appointment.patient._id === user._id
                );
                setAppointmentList(patientAppointments);
            } else setAppointmentList(todayAppointments);
        }
    }, [appointments, doctor]);

    useEffect(() => {
        if (appointmentList && searchAppointment) {
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
    }, [searchAppointment, appointmentList]);

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
        if (prescriptionList && searchPrescription) {
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
    }, [searchPrescription, prescriptionList]);

    const formatDatetotime = (date) => {
        // format date to time (hh:mm)
        const time = new Date(date);
        const hours = time.getHours();
        const minutes = time.getMinutes();
        //minutes with two digits
        if (minutes < 10) {
            return `${hours}:0${minutes}`;
        }
        return `${hours}:${minutes}`;
    };



    if (!doctor) return (
        //loading
        <div className="flex justify-center items-center h-screen">
            <h1 className="text-3xl font-bold text-gray-800">Loading...</h1>
        </div>
    );


    return (
        <main className='grid grid-cols-2 shadow-lg shadow-blue rounded-lg m-40     ' >
            {/* doctor info section */}
            <section className="flex flex-col border p-20 col-span-2 ">
                <img src="https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?w=360&t=st=1685717267~exp=1685717867~hmac=bcf4622d73ae2e5fc454842d100ae874e44c5416cb88a524ab2eef80bcc7a1f5" alt="Doctor"
                    className="rounded-full w-80 h-80 mx-auto mb-5 object-cover border-2 border-blue-500"
                />
                <div>
                    <h2 className="text-xl font-bold text-gray-800 text-center">
                        Dr.{doctor?.firstName} {doctor?.lastName}
                    </h2>
                    <h3 className="text-xl text-gray-600 text-center">{doctor?.specialty}</h3>
                    <p className="text-gray-500 text-center mt-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae
                        tristique mauris. Sed auctor sagittis fringilla. Fusce elementum
                        rhoncus justo ac pulvinar. Suspendisse potenti. Vestibulum ante
                        ipsum primis in faucibus orci luctus et ultrices posuere cubilia
                        Curae; Nullam mattis ligula vel turpis finibus ultrices.
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
            {/* Booking appointment section */}
            <section className="flex flex-col bg-white border p-20 col-span-2 ">
                <h2 className="text-2xl font-bold text-gray-800 text-center">
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

            {/* patient list section */}
            <section className="flex flex-col bg-white border p-20 ">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-5">
                    Patients
                </h2>
                <div className="flex flex-col overflow-y-auto h-80 ">
                    <TextField label="Search" value={search} onChange={(e) => setSearch(e.target.value)} className=" bg-white border w-full md:w-auto" />
                    <ul className="">
                        {filteredPatients?.map((patient) => (<li key={patient._id} className="flex items-center bg-white p-6 space-5 border hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                            <div>
                                <img src="https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?w=360&t=st=1685717267~exp=1685717867~hmac=bcf4622d73ae2e5fc454842d100ae874e44c5416cb88a524ab2eef80bcc7a1f5" alt="Patient" className="w-10 h-10 mr-5 border rounded-full object-cover" />
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
            {/* prescription list section */}
            <section className="flex flex-col overflow-hidden space-x-4 bg-white border p-20 overflow-y-auto">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-5">
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

            {/* appointment list section */}
            <section className="flex flex-col  space-x-4 bg-white p-5 col-span-2 border overflow-y-auto ">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-5">
                    Today's appointments
                </h2>
                <div className="flex flex-col overflow-y-auto h-80 ">
                    <TextField label="Search" value={searchAppointment} onChange={(e) => setSearchAppointment(e.target.value)} className=" bg-white border w-full md:w-auto" />
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredAppointments && filteredAppointments.map((appointment) => (
                                <AppointmentRow
                                    key={appointment.name}
                                    name={appointment.patient.firstName + " " + appointment.patient.lastName}
                                    date={appointment.date}
                                    time={appointment.time}
                                    details={appointment.details}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>
        </main>
    );
};

export default DoctorProfile;