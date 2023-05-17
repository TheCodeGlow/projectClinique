import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import StatCard from '../../components/dashboard/StatCard';
import AppointmentRow from '../../components/dashboard/AppointmentRow';
import NotificationBadge from '../../components/dashboard/NotificationBadge';
import Calendar from '../../components/dashboard/Calendar';
import Schedule from '../../components/dashboard/Schedule';
import "../styles/Dashboard.css"
const DashboardPage = () => {
    const [selectedDay, setSelectedDay] = useState(["MON"]);
    console.log("selectedDay ", selectedDay);
    const stats = [
        { title: 'Patients', value: '120', icon: '👥' },
        { title: 'Reports', value: '80', icon: '📄' },
        { title: 'Consultations', value: '60', icon: '🗣️' },
        { title: 'Experience', value: '5 years', icon: '🎓' },
    ];

    const events = [
        { title: 'Morning rounds', time: '8:00 AM - 10:00 AM', location: 'Ward A', days: ['Mon'] },
        { title: 'Surgery', time: '10:30 AM - 12:30 PM', location: 'Operating room 1', days: ['Tue'] },
        { title: 'Lunch break', time: '1:00 PM - 2:00 PM', location: 'Cafeteria', days: ['Sat'] },
        { title: '  Online consultation', time: '2:30 PM - 4:00 PM', location: 'Zoom', days: ['Fri'] },
    ];

    const appointments = [
        { name: 'John Doe', date: 'May 16, 2023', time: '9:00 AM', details: 'Follow-up checkup' },
        { name: 'Jane Smith', date: 'May 16, 2023', time: '10:30 AM', details: 'New patient consultation' },
        { name: 'Bob Lee', date: 'May 17, 2023', time: '11:00 AM', details: 'Prescription refill' },
        { name: 'Alice Chen', date: 'May 17, 2023', time: '1:30 PM', details: 'Lab test results review' },
    ];

    const notifications = [
        { type: 'primary', count: 2 },
        { type: 'secondary', count: 3 },
        { type: 'error', count: 5 },
    ];

    const FilteredEvents = () => {
        return events.filter((event) => event.days.includes(selectedDay));
    };


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
                    <Schedule events={events} />
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
                            {appointments.map((appointment) => (
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
                    <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
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
