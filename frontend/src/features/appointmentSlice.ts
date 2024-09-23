import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the state type
interface AppointmentsState {
  appointments: any[];
  loadingApp: boolean;
  errorApp: string | null;
}

// Initial state
const initialState: AppointmentsState = {
  appointments: [],
  loadingApp: false,
  errorApp: null,
};

// Thunk to fetch appointments by userId
export const fetchAppointmentsByUserId = createAsyncThunk(
  "appointments/fetchAppointmentsByUserId",
  async (userId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/api/appointments/doctor`,
        { id: userId }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice for managing appointments state
const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAppointmentsByUserId.pending, (state) => {
      state.loadingApp = true;
      state.errorApp = null;
    });
    builder.addCase(fetchAppointmentsByUserId.fulfilled, (state, action) => {
      state.appointments = action.payload;
      state.loadingApp = false;
    });
    builder.addCase(fetchAppointmentsByUserId.rejected, (state, action) => {
      state.loadingApp = false;
      state.errorApp = action.payload as string;
    });
  },
});

export default appointmentsSlice.reducer;
