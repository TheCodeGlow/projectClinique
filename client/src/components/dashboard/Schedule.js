import React from 'react';
import { Typography } from '@material-ui/core';
const Schedule = ({selectedDay, events}) => {
  
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
    const [eventStart, eventEnd] = event.time.split(" - ");
    const eventStartTime = new Date(`2000-01-01 ${eventStart}`).getTime();
    const eventEndTime = new Date(`2000-01-01 ${eventEnd}`).getTime();
    console.log("🚀 ~ file: Schedule.js:31 ~ isEventTimeWithinSlot ~ eventStartTime:", eventStartTime)
    console.log("🚀 ~ file: Schedule.js:32 ~ isEventTimeWithinSlot ~ eventEndTime:", eventEndTime)
    const slotTimeValue = new Date(`2000-01-01 ${slotTime}`).getTime();

    console.log("🚀 ~ file: Schedule.js:35 ~ isEventTimeWithinSlot ~ slotTimeValue:", slotTimeValue)
    return slotTimeValue >= eventStartTime && slotTimeValue <= eventEndTime;
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
                    (event) => event.day.includes(day) && isEventTimeWithinSlot(event, time)
                  );
                  console.log("🚀 ~ file: Schedule.js:92 ~ {scheduleTimes.map ~ event:", event)

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


