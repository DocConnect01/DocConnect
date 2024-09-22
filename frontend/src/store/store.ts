import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/formSlice";
import userLocationReducer from "../features/userLocationSlice";
import userReducer from '../features/userSlice'; 
import contactFormReducer from "../features/contactFormSlice";


// import chatReducer from './slices/chatSlice';
// import authReducer from './slices/authSlice';
export const store = configureStore({
  reducer: {
    form: formReducer,
    userLocation: userLocationReducer,
    users: userReducer, // Add the user reducer to the store

    contactForm: contactFormReducer,
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;