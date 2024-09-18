
import { BOOK_APPOINTMENT, SET_SELECTED_DATE, SET_AVAILABLE_SLOTS, ActionTypes } from '../types/types';

interface Appointment {
    doctorId: string;
    patientId: string;
    slot: string;
}

interface AppointmentState {
    appointments: Appointment[];
    selectedDate: Date | null;
    availableSlots: string[];
}

const initialState: AppointmentState = {
    appointments: [],
    selectedDate: null,
    availableSlots: [],
};

const appointmentReducer = (state = initialState, action: ActionTypes): AppointmentState => {
    switch (action.type) {
        case BOOK_APPOINTMENT:
            return {
                ...state,
                appointments: [...state.appointments, action.payload],
            };
        case SET_SELECTED_DATE:
            return {
                ...state,
                selectedDate: action.payload,
            };
        case SET_AVAILABLE_SLOTS:
            return {
                ...state,
                availableSlots: action.payload,
            };
        default:
            return state;
    }
};

export default appointmentReducer;
