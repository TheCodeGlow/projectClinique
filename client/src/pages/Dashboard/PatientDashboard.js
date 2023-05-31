import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

//compoment imports
import StatCard from '../../components/dashboard/StatCard';
import AppointmentRow from '../../components/dashboard/AppointmentRow';
import NotificationBadge from '../../components/dashboard/NotificationBadge';
import Calendar from '../../components/dashboard/Calendar';
import Schedule from '../../components/dashboard/Schedule';

//hooks imports
import { useAppointments } from '../../hooks/useAppointments';
import useAuth from '../../hooks/useAuth';
import { useDoctors } from '../../hooks/useDoctors';
import "../styles/Dashboard.css"
const DashboardPage = () => {

    //TODO: add events for prescriptions and consultations and others
    // state variables
    const [selectedDay, setSelectedDay] = useState(["Mon"]);
    const [date, setDate] = useState(new Date().toISOString());
    const [events, setEvents] = useState([]);
    const [patientAppointments, setPatientAppointments] = useState([]);

    // Hooks to fetch data from the API
    const {appointments} = useAppointments();
    const {doctors} = useDoctors();
    const { user } = useAuth();

    //get the patient appointments
    useEffect(() => {
        if (appointments && user) {
            const patientAppointments = appointments.filter((appointment) => {
                return appointment.patient === user.patient;
            });
            patientAppointments.forEach((appointment) => {
                appointment.date = new Date(appointment.startTime).toDateString();
                appointment.time = new Date(appointment.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            });
            //only leave upcomming appointments
            const today = new Date();
            const upcommingAppointments = patientAppointments.filter((appointment) => {
                return appointment.date >= today;
            });
            setPatientAppointments(upcommingAppointments);
        }
    }, [appointments, user]);



    //get the selectedDay and the two days after it
    const days = (selectedDay) => {
        const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const index = daysOfWeek.indexOf(selectedDay);
        const days = [];
        //check if the selectedDay is the last day of the week
        if (index === 6) {
            days.push(daysOfWeek[index]);
            days.push(daysOfWeek[0]);
            days.push(daysOfWeek[1]);
            return days;
        }
        //check if the selectedDay is the second last day of the week
        if (index === 5) {
            days.push(daysOfWeek[index]);
            days.push(daysOfWeek[6]);
            days.push(daysOfWeek[0]);
            return days;
        }
        for (let i = 0; i < 3; i++) {
            days.push(daysOfWeek[index + i]);
        }
        return days;
    };

    // create events from appointments
    useEffect(() => {
        if (appointments && user && doctors) {
            const SelectedAppointments = appointments.filter((appointment) => {
                return appointment.patient === user.patient;
            });
            //reformate patientAppointments from (startTime: (Date, required) start time of the appointment ;endTime: (Date, required) end time of the appointment ;detials: (String, required) reason for the appointment) to ({ name: 'John Doe', date: 'May 16, 2023', time: '9:00 AM', details: 'Follow-up checkup' })
            const appointmentEvent = SelectedAppointments.map((appointment) => {
                // make it in this formate 6:00 AM - 7:00 AM'
                const time = new Date(appointment.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' - ' + new Date(appointment.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const doctor = doctors.find((doctor) => {
                    return doctor._id === appointment.doctor;
                });
                return {
                    title: "Appointment with Dr." + doctor.firstName + " " + doctor.lastName,
                    time: time,
                    day: [new Date(appointment.startTime).toLocaleDateString('en-US', { weekday: 'short' })],
                    startDate: new Date(appointment.startTime), // use startDate instead of start
                    endDate: new Date(appointment.endTime), // us
                };
            });
            // add it to event
            setEvents(appointmentEvent);
        }
    }, [appointments, user, doctors]);

    //get the events of the selected day
    const FilteredEvents = () => {
        //filter the events based on the date
        const filteredEvents = events.filter((event) => {
            if (event.startDate.getDate() === new Date(date).getDate() &&
                event.startDate.getMonth() === new Date(date).getMonth() &&
                event.startDate.getFullYear() === new Date(date).getFullYear())
                return event;
            else return null;
        });
        return filteredEvents;
    };

    //stats section

    //get the number of doctors that the patient has appointments with
    const getDoctorsNumber = () => {
        if (doctors && user && appointments) {
            //get the doctors that the patient has appointments with
            const personalDoctors = [];
            appointments.forEach((appointment) => {
                if (appointment.patient === user.patient) {
                    const doctor = doctors.find((doctor) => {
                        return doctor._id === appointment.doctor;
                    });
                    if (!personalDoctors.includes(doctor)) {
                        personalDoctors.push(doctor);
                    }
                }
            });
            return personalDoctors.length;
        }
    };

    //get the number of appointments that the patient has
    const getAppointmentNumber = () => {
        if (appointments && user) {
            const patientAppointments = appointments.filter((appointment) => {
                return appointment.patient === user.patient;
            });
            return patientAppointments.length;
        }
    };

    //TODO: complete the stats section
    const stats = [
        { title: 'Doctors', value: getDoctorsNumber(), icon: '👥' },
        { title: 'Appointments', value: getAppointmentNumber(), icon: '📄' },
        { title: 'Consultations', value: '7', icon: '🗣️' },
        { title: 'Prescriptions', value: '5', icon: '💊' },
    ];

    //TODO: complete the notifications section
    const notifications = [
        { type: 'primary', count: 2 },
        { type: 'secondary', count: 3 },
        { type: 'error', count: 5 },
    ];

    return (
        <div className="dashboard-page">
            <div className="left-part">
                <h3>Statistics</h3>
                <div className="statistics-section">
                    {stats.map((stat) => (
                        <StatCard key={stat.title} title={stat.title} value={stat.value} icon={stat.icon} />
                    ))}
                </div>

                <div className="schedule-section">
                    <h4>Schedule</h4>
                    <Schedule selectedDay={days(selectedDay)} events={FilteredEvents()} />
                </div>

                <div className="appointment-section">
                    <h3>Upcoming Appointments</h3>
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
                            {patientAppointments.map((appointment) => (
                                <AppointmentRow
                                    key={appointment.name}
                                    name={appointment.name}
                                    date={appointment.date}
                                    time={appointment.time}
                                    details={appointment.details}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className="right-part">
                <div className="calendar-section">
                    <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} setDate={setDate} />
                </div>
                <div className="notifications-section">
                    <div className="notification-list">
                        {notifications.map((notification) => (
                            <NotificationBadge
                                key={notification.type}
                                type={notification.type}
                                count={notification.count}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default DashboardPage;
