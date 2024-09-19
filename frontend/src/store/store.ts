import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/formSlice"; // Assuming you have a form slice
import contactFormReducer from "../features/contactFormSlice"; // Import the correct contact form reducer

export const store = configureStore({
  reducer: {
    form: formReducer, // This is for your main form slice
    contactForm: contactFormReducer, // This is for your contact form
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
