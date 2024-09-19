import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/formSlice";
import { combineReducers } from 'redux';
import AppointmentReducer from '../Reducers/appointmentReducers';

const rootReducer = combineReducers({
  form: formReducer,
  appointments: AppointmentReducer,
});
const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;