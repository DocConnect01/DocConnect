import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/formSlice";
import userLocationReducer from "../../src/features/userLocationSlice";
import contactFormReducer from "../features/contactFormSlice";
import userReducer from "../features/userSlice";
import servicesReducer from "../features/servicesSlice";
import profileReducer from "../features/profileSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
    userLocation: userLocationReducer,
    users: userReducer,
    contactForm: contactFormReducer,
    services: servicesReducer,
    profile: profileReducer,
    //
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
