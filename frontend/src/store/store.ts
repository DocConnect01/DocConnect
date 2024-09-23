import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/formSlice";
import userLocationReducer from "../features/userLocationSlice";
import userReducer from '../features/userSlice'; 
import contactFormReducer from "../features/contactFormSlice";
import authReducer from '../features/authSlice';
import findDoctorReducer from '../features/HomeSlices/findDoctorSlice';
import servicesReducer from '../features/HomeSlices/servicesSlice';
// import doctorsReducer from '../features/doctorsSlice';
import testimonialsReducer from '../features/HomeSlices/testimonialsSlice';
import selectedDoctorReducer from '../features/HomeSlices/selectedDoctorSlice';
import selectedServiceReducer from '../features/HomeSlices/selectedServiceSlice';
import doctorsSlice from '../features/HomeSlices/doctorsSlice';

// import chatReducer from './slices/chatSlice';
// import authReducer from './slices/authSlice';
export const store = configureStore({
  reducer: {
    form: formReducer,
    userLocation: userLocationReducer,
    users: userReducer, // Add the user reducer to the store
    contactForm: contactFormReducer,
    auth: authReducer,
    findDoctor: findDoctorReducer,
    services: servicesReducer,
    // doctors: doctorsReducer,
    testimonials: testimonialsReducer,
    selectedDoctor: selectedDoctorReducer,
    selectedService: selectedServiceReducer,
    doctors: doctorsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;