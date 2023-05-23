import { LocalizationProvider, CalendarPicker } from '@material-ui/lab';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import "../../pages/styles/Dashboard.css"

const Calendar = ({ selectedDay, setSelectedDay, setDate }) => {
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CalendarPicker
                    className="calendar"
                    value={null}
                    onChange={
                        (newValue) => {
                            setSelectedDay(newValue);
                        }
                    }
                    renderDay={(day, _value) => (
                        <div
                            key={day.toISOString()}
                            className={`calendar-day${selectedDay.includes(day.toLocaleDateString()) ? ' active' : ''}`}
                            onClick={
                                () => {
                                    setSelectedDay(
                                        //get name of day in format of MON or TUE
                                        day.toLocaleDateString('en-US', { weekday: 'short' })
                                    );
                                    //get date in this formate 2021-10-25T06:00:00
                                    setDate(day.toISOString());
                                }
                            }
                        >
                            {day.toLocaleString('en-US', { day: 'numeric' })}
                        </div>
                    )}
                />
            </LocalizationProvider>
        </div>
    );
};

export default Calendar;