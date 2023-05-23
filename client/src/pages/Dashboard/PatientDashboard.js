import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import StatCard from '../../components/dashboard/StatCard';
import AppointmentRow from '../../components/dashboard/AppointmentRow';
import NotificationBadge from '../../components/dashboard/NotificationBadge';
import Calendar from '../../components/dashboard/Calendar';
import Schedule from '../../components/dashboard/Schedule';
import "../styles/Dashboard.css"
const DashboardPage = () => {
    const [selectedDay, setSelectedDay] = useState(["Mon"]);
    const [date, setDate] = useState(new Date().toISOString());


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


    const stats = [
        { title: 'Patients', value: '120', icon: '👥' },
        { title: 'Reports', value: '80', icon: '📄' },
        { title: 'Consultations', value: '60', icon: '🗣️' },
        { title: 'Experience', value: '5 years', icon: '🎓' },
    ];


    const events = [
        {
            title: 'Follow-up checkup',
            location: 'Location 1',
            time: '6:00 AM - 7:00 AM',
            day: ['Mon'],
            startDate: new Date('2023-05-08T23:00:00'), // use startDate instead of start
            endDate: new Date('2023-05-09T23:00:00'), // use endDate instead of end
        },
        {
            title: 'New patient consultation',
            location: 'Location 2',
            time: '7:00 AM - 8:00 AM',
            day: ['Tue'],
            startDate: new Date('2023-05-09T23:00:00'), // use startDate instead of start
            endDate: new Date('2023-05-09T23:00:00'), // use endDate instead of end
        },
        {
            title: 'Prescription refill',
            location: 'Location 3',
            time: '8:00 AM - 9:00 AM',
            day: ['Mon'],
            startDate: new Date('2023-05-08ST23:00:00'), // use startDate instead of start
            endDate: new Date('2023-05-09T23:00:00'), // use endDate instead of end
        },
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
