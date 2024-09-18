import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useDispatch } from 'react-redux';
import { setSelectedDate } from '../../Actions/appointmentActions';
import '../../App.css'

const AppointmentCalendar: React.FC = () => {
    const dispatch = useDispatch();
    const [date, setDate] = useState<Date | null>(new Date());

    const handleDateChange = (value: Date | Date[] | null) => {
        if (value) {
            const newDate = Array.isArray(value) ? value[0] : value;
            setDate(newDate);
            dispatch(setSelectedDate(newDate));
        }
    };

    return (
        <div className="calendar-container">
            <Calendar
                onChange={handleDateChange as any}
                value={date}
                className="border border-gray-300 rounded-lg shadow-lg"
            />
        </div>
    );
};

export default AppointmentCalendar;
