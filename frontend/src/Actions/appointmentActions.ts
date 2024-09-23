import { BOOK_APPOINTMENT, SET_SELECTED_DATE, SET_AVAILABLE_SLOTS } from '../types/types';

interface BookAppointmentAction {
    type: typeof BOOK_APPOINTMENT;
    payload: { doctorId: string; patientId: string; slot: string };
}

interface SetSelectedDateAction {
    type: typeof SET_SELECTED_DATE;
    payload: Date;
}

interface SetAvailableSlotsAction {
    type: typeof SET_AVAILABLE_SLOTS;
    payload: string[];
}

export const bookAppointment = (doctorId: string, patientId: string, slot: string): BookAppointmentAction => {
    return {
        type: BOOK_APPOINTMENT,
        payload: { doctorId, patientId, slot },
    };
};

export const setSelectedDate = (date: Date): SetSelectedDateAction => {
    return {
        type: SET_SELECTED_DATE,
        payload: date,
    };
};

export const setAvailableSlots = (slots: string[]): SetAvailableSlotsAction => {
    return {
        type: SET_AVAILABLE_SLOTS,
        payload: slots,
    };
};

export type AppointmentActions = BookAppointmentAction | SetSelectedDateAction | SetAvailableSlotsAction;
