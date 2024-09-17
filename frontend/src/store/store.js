// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
// import yourSlice from './yourSlice'; // Remove or comment out this line

const store = configureStore({
  reducer: {
    // yourSlice: yourSlice, // Remove or comment out this line
  },
});

export default store;
