import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/formSlice";
import userReducer from '../features/userSlice'; // Import your user slice

// import chatReducer from './slices/chatSlice';
// import authReducer from './slices/authSlice';
export const store = configureStore({
  reducer: {
    form: formReducer,
    users: userReducer, // Add the user reducer to the store
    // chat: chatReducer,
    // auth: authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
