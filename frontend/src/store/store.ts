import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/formSlice";
// import doctorReducer from '../features/doctorSlice'; // Import your doctor slice
import userLocationReducer from "../features/userLocationSlice";
import userReducer from '../features/userSlice'; 
import contactFormReducer from "../features/contactFormSlice";
import authReducer from "../features/authSlice"; // Import your auth slice

// import chatReducer from './slices/chatSlice';
// import authReducer from './slices/authSlice';
export const store = configureStore({
  reducer: {
    form: formReducer,
    users: userReducer, // Add the user reducer to the store
    // doctor: doctorReducer,
    contactForm: contactFormReducer,
    userLocation: userLocationReducer,
    Auth: authReducer, // Add the auth reducer to the store
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;