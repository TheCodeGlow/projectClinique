import { LocalizationProvider, CalendarPicker } from '@material-ui/lab';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import "../../pages/styles/Dashboard.css"

const Calendar =({ selectedDay, setSelectedDay })  => {
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
                                    setSelectedDay(day.toLocaleDateString())
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