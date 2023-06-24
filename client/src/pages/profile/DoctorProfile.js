import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//import custom hooks
import useAuth from '../../hooks/useAuth';
import { usePatients } from '../../hooks/usePatients';
import { useAppointments } from '../../hooks/useAppointments';
import { useAverageDoctorRating, useFeedbackById } from '../../hooks/useFeedback';
import { useDoctor } from '../../hooks/useDoctors';

//import components
import { Link } from 'react-router-dom';
import DoctorAppointment from '../../components/profile/DoctorAppointment';
import {
    TextField,
} from '@material-ui/core';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { FaUserEdit, FaComment, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import "../styles/DoctorProfile.css"

import { getOrCreateChat } from 'react-chat-engine';

const DoctorProfile = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const { patients } = usePatients();
    const { appointments } = useAppointments();
    const { doctor, isLoading } = useDoctor(id);

    const [patient, setPatient] = useState('');
    const [appointmentList, setAppointmentList] = useState([]);
    const [searchAppointment, setSearchAppointment] = useState('');
    const [filteredAppointments, setFilteredAppointments] = useState(null);
    const [feedbackList, setFeedbackList] = useState([]);
    const [searchFeedback, setSearchFeedback] = useState('');
    const [filteredFeedbacks, setFilteredFeedbacks] = useState(null);

    // Doctor rating section logic
    const { data: averageRating, isLoading: ratingLoading } = useAverageDoctorRating(id);

    // Doctor reviews section logic
    const { data: feedbacks, isLoading: feedbackLoading } = useFeedbackById(id);

    useEffect(() => {
        if (feedbacks && patients && user) {
            const FeedbackWithPatient = feedbacks.map(feedback => {
                const patient = patients.find(patient => {
                    return patient._id === feedback.patient
                });
                if (patient) {
                    return { ...feedback, patient: patient };
                }
                return feedback;
            });

            !user.isDoctor ?
                setFeedbackList(FeedbackWithPatient.filter(feedback => feedback.patient._id === user.patient)) :
                setFeedbackList(FeedbackWithPatient);
        }
    }, [feedbacks, patients, user]);

    useEffect(() => {
        if (feedbackList && searchFeedback) {
            setFilteredFeedbacks(
                feedbackList.filter((feedback) =>
                    feedback.patient.firstName
                        .toLowerCase()
                        .includes(searchFeedback.toLowerCase())
                )
            );
        } else {
            setFilteredFeedbacks(feedbackList);
        }
    }, [searchFeedback, feedbackList, patients]);


    // Booking appointment section logic
    useEffect(() => {
        if (user && !user.isDoctor ) {
            setPatient(user.patient);
        }
    }, [user]);

    // appointment list section logic
    useEffect(() => {
        if (appointments && doctor && patients && user) {
            // Get all appointments that have the doctor
            const appointmentList = appointments.filter(appointment => appointment.doctor === doctor._id && appointment.status === 'accepted');

            // Add patient info to each appointment
            const updatedAppointments = appointmentList.map(appointment => {
                const patient = patients.find(patient => patient._id === appointment.patient);
                if (patient) {
                    return { ...appointment, patient: patient };
                }
                return appointment;
            });

            // Filter today's appointments
            const today = new Date();
            const todayAppointments = updatedAppointments.filter(appointment => {
                const startTime = new Date(appointment.startTime);
                return (
                    startTime.getDate() === today.getDate() &&
                    startTime.getMonth() === today.getMonth() &&
                    startTime.getFullYear() === today.getFullYear()
                );
            });

            // Add time and date to each appointment
            todayAppointments.forEach(appointment => {
                const startTime = new Date(appointment.startTime);
                const endTime = new Date(appointment.endTime);
                const formatTime = (time) => time.toString().padStart(2, '0');
                appointment.time = `${formatTime(startTime.getHours())}:${formatTime(startTime.getMinutes())}-${formatTime(endTime.getHours())}:${formatTime(endTime.getMinutes())}`;
                appointment.date = `${startTime.getDate()}/${startTime.getMonth()}/${startTime.getFullYear()}`;
            });

            // Filter appointments based on user type
            const filteredAppointments = user && !user.isDoctor
                ? todayAppointments.filter(appointment => appointment.patient._id === user.patient)
                : todayAppointments;

            setAppointmentList(filteredAppointments);
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

    const handleMessage = () => {
        const patient = patients.find((patient) => {
            return patient._id === user.patient;
        });

        getOrCreateChat({
            userName: patient.firstName + " " + patient.lastName,
            userSecret: user.password,
            email: user.email,
            projectID: "05e8fe9c-bf36-496a-bf00-1c5bfd1daa81",
        },
            {
                is_direct_chat: true,
                usernames: [doctor.firstName + " " + doctor.lastName, patient.firstName + " " + patient.lastName],
            },);

    }
    if (isLoading) return (
        //loading
        <div className="flex justify-center items-center h-screen">
            <h1 className="text-3xl font-bold text-gray-800">Loading...</h1>
        </div>
    );

    return (
        <main className='grid grid-cols-2 shadow-lg shadow-blue rounded-lg m-40' >
            {/* doctor info section */}
            {(!isLoading && doctor && user && !ratingLoading) ? (
                <section className="flex flex-col border p-20 col-span-2 ">
                    <img src={process.env.PUBLIC_URL + '/uploads/' + doctor.profilePicture} alt="Doctor"
                        className="rounded-full w-80 h-80 mx-auto mb-5 object-cover border-2 border-gray-300"
                    />
                    <div>
                        <h2 className="text-4xl font-bold text-gray-600 text-center">
                            Dr.{doctor?.firstName} {doctor?.lastName}
                        </h2>
                        <h3 className="text-xl text-gray-600 font-semibold text-center">{doctor?.specialty}</h3>
                        <div className="flex justify-center items-center mt-5">
                            {/* represent doctor rating in stars */}
                            <div className="flex items-center">
                                {Array.from({ length: Math.floor(averageRating) }).map((_, index) => (
                                    <FaStar key={index} className="text-yellow-400 text-2xl" />
                                ))}
                                {averageRating % 1 !== 0 && (
                                    <FaStarHalfAlt className="text-yellow-400 text-2xl" />
                                )}
                                <p className="text-gray-500 text-xl font-semibold ml-2">
                                    {averageRating?.toFixed(1)}
                                </p>
                            </div>
                        </div>
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
                    ) : (!user.isDoctor && (
                        <button className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
                            onClick={handleMessage}
                        >
                            <FaComment className="mr-2" />
                            Message
                        </button>
                    ))}
                </section>
            ) : (
                <section className="flex flex-col border p-20 col-span-2 ">
                    <div className="flex justify-center items-center h-screen">
                        <h1 className="text-3xl font-bold text-gray-800">Loading...</h1>
                    </div>
                </section>
            )
            }

            {/* Booking appointment section */}
            {
                (!isLoading && doctor && patients && user) ? (
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
                )
            }

            {/* appointment list section */}
            {
                (!isLoading && doctor && appointments && patients && filteredAppointments) ? (
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
                )
            }
            {/* doctor reviews section */}
            {
                (!isLoading && doctor && feedbacks && patients && filteredFeedbacks) ? (
                    <section className="flex flex-col space-x-4 bg-white p-5 col-span-2 border overflow-y-auto ">
                        <h2 className="text-2xl font-bold text-center text-gray-500 mb-5">
                            Reviews
                        </h2>
                        <div className="flex flex-col overflow-y-auto h-80 ">
                            <TextField label="Search" value={searchFeedback} onChange={(e) => setSearchFeedback(e.target.value)} className=" bg-white border w-full md:w-auto" />
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="text-gray-400 text-xl font-bold">Name</TableCell>
                                        <TableCell className="text-gray-400 text-xl font-bold">Date</TableCell>
                                        <TableCell className="text-gray-400 text-xl font-bold">Rating</TableCell>
                                        <TableCell className="text-gray-400 text-xl font-bold">Comment</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredFeedbacks.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-gray-500 text-xl font-bold">
                                                No reviews found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredFeedbacks.map((feedback) => (
                                            feedback.patient ? (
                                                <TableRow key={feedback._id} className="text-gray-500 text-xl font-bold">
                                                    <TableCell>
                                                        {feedback.patient.firstName + " " + feedback.patient.lastName}
                                                    </TableCell>
                                                    <TableCell>{ new Date(feedback.updatedAt).getDate()}/{new Date(feedback.updatedAt).getMonth()}/{new Date(feedback.updatedAt).getFullYear()}</TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center">
                                                            {Array.from({ length: Math.floor(feedback.rating) }).map((_, index) => (
                                                                <FaStar key={index} className="text-yellow-400 text-2xl" />
                                                            ))}
                                                            {feedback.rating % 1 !== 0 && (
                                                                <FaStarHalfAlt className="text-yellow-400 text-2xl" />
                                                            )}
                                                            <p className="text-gray-500 text-xl font-semibold ml-2">
                                                                {feedback.rating?.toFixed(1)}
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{feedback.content}</TableCell>
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
                )
            }
        </main >
    );
};

export default DoctorProfile;