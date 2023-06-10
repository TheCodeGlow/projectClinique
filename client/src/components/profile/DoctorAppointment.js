import React, { useEffect, useReducer } from 'react';
// import useCallback
import { useCallback } from 'react';
import Draggable from 'react-draggable';
import { useAppointments, useCreateAppointment } from '../../hooks/useAppointments';
//improt clock from react-icons
import { FaClock } from 'react-icons/fa';

const initialState = {
    selectedMonth: null,
    appointmentCreated: false,
    selectedDay: null,
    selectedTimeSlot: null,
    appointmentDetails: '',
    timeSlots: [],
    errors: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_SELECTED_MONTH':
            return { ...state, selectedMonth: action.payload };
        case 'SET_APPOINTMENT_CREATED':
            return { ...state, appointmentCreated: action.payload };
        case 'SET_SELECTED_DAY':
            return { ...state, selectedDay: action.payload };
        case 'SET_SELECTED_TIME_SLOT':
            return { ...state, selectedTimeSlot: action.payload };
        case 'SET_APPOINTMENT_DETAILS':
            return { ...state, appointmentDetails: action.payload };
        case 'SET_TIME_SLOTS':
            return { ...state, timeSlots: action.payload };
        case 'SET_ERRORS':
            return { ...state, errors: action.payload };
        default:
            return state;
    }
};

const DoctorAppointment = ({ idPatient, idDoctor }) => {
    const { appointments } = useAppointments();
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        selectedMonth,
        appointmentCreated,
        selectedDay,
        selectedTimeSlot,
        appointmentDetails,
        timeSlots,
        errors,
    } = state;



    const generateMonths = () => {
        const date = new Date();
        const months = [];

        for (let i = 0; i < 12; i++) {
            const month = date.toLocaleString('default', { month: 'long' });
            const monthNumber = date.getMonth() + 1;
            months.push({ value: monthNumber, label: month });
            date.setMonth(date.getMonth() + 1);
        }

        return months;
    };

    const generateDays = () => {
        const date = new Date();
        const daysInMonth = new Date(
            date.getFullYear(),
            selectedMonth,
            0
        ).getDate();
        const days = [];

        for (let i = 1; i <= daysInMonth; i++) {
            date.setDate(i);
            const day = date.toLocaleString('default', { weekday: 'short' });
            const number = String(i).padStart(2, '0');
            days.push({ value: i, day, number });
        }

        return days;
    };

    // generate time slots for the selected day based on the appointments
    const generateTimeSlots = useCallback(() => {
        const timeSlots = [];
        const selectedDayDate = new Date(
            new Date().getFullYear(),
            selectedMonth - 1,
            selectedDay + 1
        ).toISOString().split('T')[0];

        const appointmentsForSelectedDay = appointments.filter(
            (appointment) => {
                const appointmentDate = appointment.startTime.split('T')[0];
                return (appointmentDate === selectedDayDate && appointment.doctor === idDoctor)
            }
        );
        for (let i = 1; i <= 24; i++) {
            const isBooked = appointmentsForSelectedDay.find(
                (appointment) => new Date(appointment.startTime).getHours() === i
            );
            if (!isBooked) {
                // check if i is less than 10 and add 0 before but if it's 9 the endtime will be 10
                if (i < 10) {
                    timeSlots.push({ value: i, label: `0${i}:00` });
                }
                else if (i === 9) {
                    timeSlots.push({ value: i, label: `0${i}:00` });
                }
                else {
                    timeSlots.push({ value: i, label: `${i}:00` });
                }

            }
        }
        return timeSlots;
    }, [selectedMonth, selectedDay, appointments, idDoctor]);

    useEffect(() => {
        if (selectedMonth && selectedDay) {
            const timeSlots = generateTimeSlots();
            dispatch({ type: 'SET_TIME_SLOTS', payload: timeSlots });
        }
    }, [selectedMonth, selectedDay, generateTimeSlots]);


    const months = generateMonths();
    const days = generateDays();

    const createAppointmentMutation = useCreateAppointment();
    const { isSuccess, isError, error } = createAppointmentMutation;

    useEffect(() => {
        if (isSuccess) {
            dispatch({ type: 'SET_APPOINTMENT_CREATED', payload: true });
        }
        if (isError) {
            dispatch({ type: 'SET_ERRORS', payload: JSON.stringify(error) });
        }
    }, [isSuccess, isError, error]);

    const handleCreateAppointment = async () => {
        if (!selectedMonth || !selectedDay || !selectedTimeSlot || !appointmentDetails || !idDoctor || !idPatient) {
            dispatch({ type: 'SET_ERRORS', payload: 'Please fill all the fields' });
            return;
        }

        const date = new Date();
        const currentYear = date.getFullYear();
        const month = selectedMonth < 10 ? '0' + selectedMonth : selectedMonth;
        const day = selectedDay < 10 ? '0' + selectedDay : selectedDay;
        const startTimeSlot = selectedTimeSlot - 1;
        const endTimeSlot = selectedTimeSlot < 9 ? selectedTimeSlot + 1 : 10;

        const startDate = new Date(Date.UTC(currentYear, month - 1, day, startTimeSlot));
        const endDate = new Date(Date.UTC(currentYear, month - 1, day, endTimeSlot));
        const appointment = {
            doctor: idDoctor,
            patient: idPatient,
            startTime: startDate,
            endTime: endDate,
            details: appointmentDetails,
        };
        createAppointmentMutation.mutate(appointment);
    };



    return (
        <div className="flex flex-col items-center mt-10 w-50">
            <div className="mb-4">
                <select
                    id="month"
                    className="px-2 py-1 bg-white rounded-md bg-gray-100 font-bold text-xl"
                    value={selectedMonth}
                    onChange={(e) =>
                        dispatch({ type: 'SET_SELECTED_MONTH', payload: Number(e.target.value) })
                    }
                >
                    <option value="" className='font-bold text-center'>-- Month --</option>
                    {months.map((month) => (
                        <option key={month.value} value={month.value} className='font-bold'>
                            - {month.label} -
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex pb-4">
                <Draggable axis="x">
                    <div className="flex overflow-x-auto scrollbar-hide ">
                        {days.map((day) => (
                            <div
                                key={day.value}
                                className={`flex flex-col items-center h-20 w-15 p-4 shadow-md border rounded-md mx-1 ${selectedDay === day.value
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 bg-white'
                                    }`}
                                onClick={() => dispatch({ type: 'SET_SELECTED_DAY', payload: day.value })}
                            >
                                <div className="text-sm text-lg ">{day.day}</div>
                                <div className=' font-bold text-xl'>{day.number}</div>
                            </div>
                        ))}
                    </div>
                </Draggable>
            </div>

            <div className="flex flex-col pb-4">
                <label htmlFor="time" className="mr-2 text-gray-700">
                    Set Time:
                </label>
                <Draggable axis="x">
                    <div className="flex overflow-x-auto scrollbar-hide">
                        {timeSlots.map((timeSlot) => (
                            <div
                                key={timeSlot.value}
                                className={` flex items-center px-4 h-10 py-1 text-xl shadow-md border rounded-md mx-1 ${selectedTimeSlot === timeSlot.value
                                    ? 'bg-green-500 text-white'
                                    : 'bg-white text-gray-700'
                                    }`}
                                onClick={() =>
                                    dispatch({ type: 'SET_SELECTED_TIME_SLOT', payload: timeSlot.value })
                                }
                            >
                                <FaClock className="inline-block mr-1" />
                                {timeSlot.label}
                            </div>
                        ))}
                    </div>
                </Draggable>
            </div>

            <div className="flex flex-col mt-4">
                <label htmlFor="details" className="mr-2 text-gray-900 text-center font-bold text-xl">
                    Appointment Details:
                </label>
                <textarea
                    id="details"
                    className="px-2 py-1 border border-gray-300 rounded-md bg-White w-80 h-24"
                    value={appointmentDetails}
                    onChange={(e) =>
                        dispatch({ type: 'SET_APPOINTMENT_DETAILS', payload: e.target.value })
                    }
                />
            </div>

            <button
                onClick={handleCreateAppointment}
                className="px-4 py-2 mt-4 text-white font-bold text-xl bg-blue-500 rounded-md hover:bg-blue-600"
            >
                Book Appointment
            </button>

            {appointmentCreated && (
                <div className="mt-4 text-green-500">Appointment booked successfully!</div>
            )}

            {errors && (
                <div className="mt-4 text-red-500">{errors}</div>
            )}
        </div>
    );
};

export default DoctorAppointment;
