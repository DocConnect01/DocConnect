
import { SET_SELECTED_DATE, BOOK_APPOINTMENT, SET_AVAILABLE_SLOTS } from '../types/types';

export const setSelectedDate = (date: Date | null) => ({
    type: SET_SELECTED_DATE,
    payload: date,
});

export const bookAppointment = (doctorId: string, patientId: string, slot: string) => ({
    type: BOOK_APPOINTMENT,
    payload: { doctorId, patientId, slot },
});

export const setAvailableSlots = (slots: string[]) => ({
    type: SET_AVAILABLE_SLOTS,
    payload: slots,
});
