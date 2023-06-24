//TODO: add a cancel/approve button if appointment is pending
//TODO: add a cancel/update button if appointment is approved
//TODO : add prescription page that contains all info about the prescription as well as update/delete functionality


import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

//compoment imports
import StatCard from '../../components/dashboard/StatCard';
import NotificationBadge from '../../components/dashboard/NotificationBadge';
import Calendar from '../../components/dashboard/Calendar';
import Schedule from '../../components/dashboard/Schedule';

//hooks imports
import { useAppointments, useUpdateAppointment } from '../../hooks/useAppointments';
import useAuth from '../../hooks/useAuth';
import { usePatients } from '../../hooks/usePatients';
import "../styles/Dashboard.css"

const DoctorDashboard = () => {
  // state variables
  const [selectedDay, setSelectedDay] = useState(["Mon"]);
  const [date, setDate] = useState(new Date().toISOString());
  const [events, setEvents] = useState([]);
  const [doctorAppointments, setDoctorAppointments] = useState([]);


  // Hooks to fetch data from the API
  const { appointments } = useAppointments();
  const { patients } = usePatients();

  const { user } = useAuth();
  const { rejectAppointment, approveAppointment } = useUpdateAppointment();

  //get the patient appointments
  useEffect(() => {
    if (appointments && user && patients) {
      const doctorAppointments = appointments.filter((appointment) => {
        return appointment.doctor === user.doctor &&
          appointment.status !== "rejected";
      });

      doctorAppointments.forEach((appointment) => {
        appointment.date = new Date(appointment.startTime).toDateString();
        appointment.time = new Date(appointment.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      });
      //add patient info to the appointment
      doctorAppointments.forEach((appointment) => {
        const patient = patients.find((patient) => {
          return patient._id === appointment.patient;
        });
        if (patient) appointment.name = patient.firstName + " " + patient.lastName;
      });
      //only leave upcomming appointments
      const today = new Date()
      today.setHours(0, 0, 0, 0);
      const upcommingAppointments = doctorAppointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.date);
        return appointmentDate >= today;
      });

      setDoctorAppointments(upcommingAppointments);
    }
  }, [appointments, user, patients]);



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
    if (appointments && user && patients) {
      const SelectedAppointments = appointments.filter((appointment) => {
        return appointment.doctor === user.doctor;
      });
      const appointmentEvent = SelectedAppointments.map((appointment) => {
        const time = new Date(appointment.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' - ' + new Date(appointment.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const patient = patients.find((patient) => {
          return patient._id === appointment.patient;
        });
        const patientName = patient?.firstName && patient?.lastName ? `Mr. ${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
        return {
          title: `Appointment with ${patientName}`,
          time: time,
          day: [new Date(appointment.startTime).toLocaleDateString('en-US', { weekday: 'short' })],
          startDate: new Date(appointment.startTime),
          endDate: new Date(appointment.endTime),
        };
      });
      // add it to event
      setEvents(appointmentEvent);
    }
  }, [appointments, user, patients]);



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
  const getPatientsNumber = () => {
    if (patients && user && appointments) {
      //get the doctors that the patient has appointments with
      const personalPatients = [];
      appointments.forEach((appointment) => {
        if (appointment.doctor === user.doctor) {
          const patient = patients.find((patient) => {
            return patient._id === appointment.patient;
          });
          if (!personalPatients.includes(patient)) {
            personalPatients.push(patient);
          }
        }
      });
      return personalPatients.length;
    }
  };

  //get the number of appointments that the patient has
  const getAppointmentNumber = () => {
    if (appointments && user) {
      const doctorAppointments = appointments.filter((appointment) => {
        return appointment.doctor === user.doctor;
      });
      return doctorAppointments.length;
    }
  };


  //TODO: complete the stats section
  const stats = [
    { title: 'Patients', value: getPatientsNumber(), icon: '👥' },
    { title: 'Appointments', value: getAppointmentNumber(), icon: '📄' },
    { title: 'Reviews', value: '7', icon: '📝' },
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
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctorAppointments.map((appointment) => (
                <TableRow className="appointment-row"
                  key={
                    appointment._id
                  }>
                  <TableCell>{appointment.name}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>{appointment.details}</TableCell>
                  <TableCell>
                    {appointment && appointment.status === "pending" && (
                      <button
                        className="approve-button"
                        onClick={() => {
                          approveAppointment(appointment._id);
                        }}
                      >
                        Approve
                      </button>
                    )}
                    <button
                      className="reject-button"
                      onClick={() => {
                        rejectAppointment(appointment._id);
                      }}
                    >
                      Cancel
                    </button>
                  </TableCell>
                </TableRow>
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


export default DoctorDashboard;