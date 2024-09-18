// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
// import yourSlice from './yourSlice'; // Remove or comment out this line
// redux/store.ts
import {  combineReducers } from 'redux';
// import thunk from 'redux-thunk';
import AppointmentReducer from '../Reducers/appointmentReducers';

const rootReducer = combineReducers({
  appointments: AppointmentReducer,
  
});





const store = configureStore({
  reducer: rootReducer,
  
});

export default store;
