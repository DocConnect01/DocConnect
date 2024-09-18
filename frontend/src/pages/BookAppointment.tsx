
import './BookApp.css'
import React from 'react';
import AppointmentCalendar from '../components/Appointment/AppointmentCalendar';
import TimeSlotSelector from '../components/Appointment/TimeSlotSelector';

const BookAppointment: React.FC = () => {
    const doctorId = '1'; // Mocked doctor ID
    const patientId = '123'; // Mocked patient ID

    return (
        <div className="container">
            <h1>Book an Appointment</h1>
            <div className="grid">
                <div className="card">
                    <h3>Select a Date</h3>
                    <AppointmentCalendar />
                </div>
                <div className="card">
                    <h3>Available Slots</h3>
                    <TimeSlotSelector doctorId={doctorId} patientId={patientId} />
                </div>
            </div>
        </div>
    );
};

export default BookAppointment;
