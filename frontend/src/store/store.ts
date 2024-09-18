import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/formSlice";
import userLocationReducer from "../features/UserLocationSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
    userLocation: userLocationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;