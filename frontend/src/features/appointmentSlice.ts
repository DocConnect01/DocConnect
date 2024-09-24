import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AppointmentsState {
  appointments: any[];
  loadingApp: boolean;
  errorApp: string | null;
}

const initialState: AppointmentsState = {
  appointments: [],
  loadingApp: false,
  errorApp: null,
};

export const fetchAppointmentsByUserId = createAsyncThunk(
  "appointments/fetchAppointmentsByUserId",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/appointments/doctor`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointmentsByUserId.pending, (state) => {
        state.loadingApp = true;
        state.errorApp = null;
      })
      .addCase(fetchAppointmentsByUserId.fulfilled, (state, action) => {
        state.appointments = action.payload;
        state.loadingApp = false;
      })
      .addCase(fetchAppointmentsByUserId.rejected, (state, action) => {
        state.loadingApp = false;
        state.errorApp = action.payload as string;
      });
  },
});

export default appointmentsSlice.reducer;