import React from 'react';
import { Typography } from '@material-ui/core';
const Schedule = ({ selectedDay, events }) => {


  const scheduleTimes = generateTimeSlots();

  function generateTimeSlots() {
    const startTime = 6;
    const endTime = 18;
    const timeSlots = [];
    for (let hour = startTime; hour <= endTime; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = new Date();
        time.setHours(hour);
        time.setMinutes(minute);
        const formattedTime = time.toLocaleString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });
        timeSlots.push(formattedTime);
      }
    }
    return timeSlots;
  }

  function isEventTimeWithinSlot(event, slotTime) {
    //endDate: Sun Jul 02 2023 11:00:00 GMT+0100 (UTC+01:00) 
    //startDate: Sun Jul 02 2023 14:00:00 GMT+0100 (UTC+01:00) 
    const eventStart = event.startDate;
    const eventEnd = event.endDate;
    const eventStartTime = eventStart.toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    const eventEndTime = eventEnd.toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    const eventStartTimeValue = getTimeValue(eventStartTime);
    const eventEndTimeValue = getTimeValue(eventEndTime);
    const slotTimeValue = getTimeValue(slotTime);
    
    return slotTimeValue >= eventStartTimeValue &&  slotTimeValue <= eventEndTimeValue;
  }

  function getTimeValue(time) {
    const [hourString, minuteString, period] = time.split(/:| /);
    let hours = Number(hourString);
    const minutes = Number(minuteString);

    if (period === "PM" && hours !== 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    return hours * 60 + minutes;
  }



  return (
    <div className={`schedule-events ${selectedDay.length > 0 ? 'show' : ''} fade-in-animation`}>
      <div className="schedule-container">
        <table className="schedule-table">
          <tbody>
            <tr>
              <th className="empty-cell"></th>
              {scheduleTimes.map((time) => (
                <th key={time} className="time-column">
                  {time}
                </th>
              ))}
            </tr>
            {selectedDay.map((day) => (
              <tr key={day}>
                <td className="day-column">{day}</td>
                {scheduleTimes.map((time) => {
                  const event = events.find(
                    (event) => {
                      return event.day.includes(day) && isEventTimeWithinSlot(event, time)
                    }
                  );
                  return (
                    <td key={`${day}-${time}`}>
                      {event && (
                        <div className="schedule-event">
                          <div className="event-content">
                            <h5 className="event-title">{event.title}</h5>
                            <p className="event-location">{event.location}</p>
                            <p className="event-time">{event.time}</p>
                          </div>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
            {selectedDay.length === 0 && (
              <tr>
                <td className="day-column" colSpan={scheduleTimes.length + 1}>
                  No selected day
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

};

export default Schedule;


