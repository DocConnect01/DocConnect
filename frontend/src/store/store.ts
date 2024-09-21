import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/formSlice";
import userLocationReducer from "../features/UserLocationSlice";
import userReducer from '../features/userSlice'; 
import contactFormReducer from "../features/contactFormSlice";
import authReducer from '../features/authSlice';
import findDoctorReducer from '../features/findDoctorSlice';
import servicesReducer from '../features/servicesSlice';
import doctorsReducer from '../features/doctorsSlice';
import testimonialsReducer from '../features/testimonialsSlice';


export const store = configureStore({
  reducer: {
    form: formReducer,
    userLocation: userLocationReducer,
    users: userReducer, 
    contactForm: contactFormReducer,
    auth: authReducer,
    findDoctor: findDoctorReducer,
    services: servicesReducer,
    doctors: doctorsReducer,
    testimonials: testimonialsReducer,
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;






