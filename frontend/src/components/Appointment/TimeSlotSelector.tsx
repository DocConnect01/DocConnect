import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookAppointment } from '../../Actions/appointmentActions';

interface TimeSlotSelectorProps {
    doctorId: string;
    patientId: string;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({ doctorId, patientId }) => {
    const dispatch = useDispatch();
    const availableSlots = useSelector((state: { appointments: { availableSlots: string[] } }) => state.appointments.availableSlots);

    const handleSlotSelection = (slot: string) => {
        dispatch(bookAppointment(doctorId, patientId, slot));
    };

    return (
        <div className="mt">
            <h3 className="text-lg">Available Slots</h3>
            <div className="grid">
                {availableSlots.map((slot, index) => (
                    <button
                        key={index}
                        className="button"
                        onClick={() => handleSlotSelection(slot)}
                    >
                        {slot}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TimeSlotSelector;
