import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

//import custom hooks
import useAuth from '../../hooks/useAuth';
import { usePatients } from '../../hooks/usePatients';
import { useAppointments, useCreateAppointment } from '../../hooks/useAppointments';
import { usePatientPrescriptions } from '../../hooks/usePrescriptions';
import { useDoctor } from '../../hooks/useDoctors';
import { CalendarPicker, LocalizationProvider } from '@material-ui/lab';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import {
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@material-ui/core';
import '../styles/DoctorProfile.css';

const DoctorProfile = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const { patients } = usePatients();
    const { appointments } = useAppointments();
    const { prescriptions } = usePatientPrescriptions();
    const { doctor } = useDoctor(id);
    console.log(doctor);

    // Booking appointment section logic
    const [selectedDate, setSelectedDate] = useState(null);
    const [open, setOpen] = useState(false);
    const [patient, setPatient] = useState('');
    const [reason, setReason] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const { createAppointment } = useCreateAppointment();

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setOpen(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        createAppointment({ patient, reason, startTime, endTime });
        setOpen(false);
    };

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
        if (appointments && doctor) {
            // get all appointments that have the doctor
            const appointmentList = appointments.filter((appointment) =>
                appointment.doctor === doctor._id
            );
            setAppointmentList(appointmentList);
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

    return (
        <div className="MainContainer">
            {/* doctor info section */}
            <section className="doctorInfo">
                <div className="doctorInfo__image">
                    <img src={doctor?.image} alt="doctor" />
                </div>
                <div className="doctorInfo__details">
                    <h2>
                        {doctor?.firstName} {doctor?.lastName}
                    </h2>
                    <h3>{doctor?.specialty}</h3>
                    <p>{doctor?.description}</p>
                </div>
            </section>
            {/* Booking appointment section */}
            <section className="bookingAppointment">
                <h2>Book an Appointment</h2>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CalendarPicker
                        value={selectedDate}
                        onChange={handleDateChange}
                        renderInput={(props) => <TextField {...props} />}
                    />
                </LocalizationProvider>
            </section>

            {/* Popup form */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Book Appointment</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form__group">
                            <label htmlFor="patient">Patient</label>
                            <select
                                name="patient"
                                id="patient"
                                value={patient}
                                onChange={(e) => setPatient(e.target.value)}
                            >
                                {patients?.map((patient) => (
                                    <option key={patient._id} value={patient._id}>
                                        {patient.firstName} {patient.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form__group">
                            <label htmlFor="reason">Reason</label>
                            <textarea
                                name="reason"
                                id="reason"
                                cols="30"
                                rows="10"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="form__group">
                            <label htmlFor="startTime">Start Time</label>
                            <input
                                type="text"
                                name="startTime"
                                id="startTime"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </div>
                        <div className="form__group">
                            <label htmlFor="endTime">End Time</label>
                            <input
                                type="text"
                                name="endTime"
                                id="endTime"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                        </div>
                        <DialogActions>
                            <Button onClick={() => setOpen(false)}>Cancel</Button>
                            <Button type="submit" onClick={handleFormSubmit} color="primary">
                                Book Appointment
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
            {/* patient list section */}
            <section className="patientList">
                <h2>Patients</h2>
                <TextField
                    label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <ul>
                    {filteredPatients?.map((patient) => (
                        <li key={patient._id}>
                            <div className="patientList__image">
                                <img src={patient.image} alt="patient" />
                            </div>
                            <div className="patientList__details">
                                <h3>
                                    {patient.firstName} {patient.lastName}
                                </h3>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            {/* appointment list section */}
            <section className="appointmentList">
                <h2>Appointments</h2>
                <TextField
                    label="Search"
                    value={searchAppointment}
                    onChange={(e) => setSearchAppointment(e.target.value)}
                />
                <ul>
                    {filteredAppointments?.map((appointment) => (
                        <li key={appointment._id}>
                            <div className="appointmentList__image">
                                <img src={appointment.patient.image} alt="patient" />
                            </div>
                            <div className="appointmentList__details">
                                <h3>
                                    {appointment.patient.firstName} {appointment.patient.lastName}
                                </h3>
                                <p>{appointment.date}</p>
                                <p>{appointment.time}</p>
                                <p>{appointment.reason}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            {/* prescription list section */}
            <section className="prescriptionList">
                <h2>Prescriptions</h2>
                <TextField
                    label="Search"
                    value={searchPrescription}
                    onChange={(e) => setSearchPrescription(e.target.value)}
                />
                <ul>
                    {filteredPrescriptions?.map((prescription) => (
                        <li key={prescription._id}>
                            <div className="prescriptionList__image">
                                <img src={prescription.patient.image} alt="patient" />
                            </div>
                            <div className="prescriptionList__details">
                                <h3>
                                    {prescription.patient.firstName} {prescription.patient.lastName}
                                </h3>
                                <p>{prescription.date}</p>
                                <p>{prescription.medication}</p>
                                <p>{prescription.dosage}</p>
                                <p>{prescription.instructions}</p>
                                <p>{prescription.refills}</p>
                                <p>{prescription.refillDate}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default DoctorProfile;
