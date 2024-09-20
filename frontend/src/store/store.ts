import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/formSlice";
<<<<<<< HEAD
import userLocationReducer from "../features/UserLocationSlice";
=======
import userReducer from '../features/userSlice'; // Import your user slice
>>>>>>> ebe9c30a477c476151f4758a0955d9d291f3beea

export const store = configureStore({
  reducer: {
    form: formReducer,
<<<<<<< HEAD
    userLocation: userLocationReducer,
=======
    users: userReducer, // Add the user reducer to the store

>>>>>>> ebe9c30a477c476151f4758a0955d9d291f3beea
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;