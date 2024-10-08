import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/formSlice";
import userLocationReducer from "../features/userLocationSlice";
import userReducer from '../features/userSlice'; 
import doctorReducer from '../features/doctorSlice'; // Import your doctor slice
// import userReducer from '../features/userSlice'; // Import your user slice
// import doctorReducer from '../features/doctorSlice'; // Import your doctor slice
// import userLocationReducer from "../features/UserLocationSlice";
import contactFormReducer from "../features/contactFormSlice";
import authReducer from "../features/authSlice"; // Import your auth slice
import sessionReducer from '../features/sessionSlice'; // Import your session slice
import appointmentsReducer from '../features/appointmentSlice'; // Adjust the import path as necessary
import findDoctorReducer from '../features/HomeSlices/findDoctorSlice';
import servicesReducer from '../features/HomeSlices/servicesSlice';
import testimonialsReducer from '../features/HomeSlices/testimonialsSlice';
import selectedDoctorReducer from '../features/HomeSlices/selectedDoctorSlice';
import selectedServiceReducer from '../features/HomeSlices/selectedServiceSlice';
import doctorsSlice from '../features/HomeSlices/doctorsSlice';
import mapReducer from '../features/HomeSlices/mapSlice';
// import chatReducer from './slices/chatSlice';
// import authReducer from './slices/authSlice';

import userProfileReducer from '../features/userProfileSlice';

  
export const store = configureStore({
  reducer: {
    userProfile: userProfileReducer,
    form: formReducer,
    users: userReducer, // Add the user reducer to the store
    doctor: doctorReducer,
    contactForm: contactFormReducer,
    userLocation: userLocationReducer,
    Auth: authReducer, // Add the auth reducer to the store
    session: sessionReducer,
    appointments: appointmentsReducer,
    auth: authReducer,
    findDoctor: findDoctorReducer,
    services: servicesReducer,
    // doctors: doctorsReducer,
    testimonials: testimonialsReducer,
    selectedDoctor: selectedDoctorReducer,
    selectedService: selectedServiceReducer,
    doctors: doctorsSlice,
    map: mapReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;