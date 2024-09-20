import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/formSlice";
import contactFormReducer from "../features/contactFormSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
    contactForm: contactFormReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
