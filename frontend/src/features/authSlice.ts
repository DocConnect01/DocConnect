import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  UserID: string;
  FirstName: string;
  LastName: string;
  Username: string;
  Email: string;
  Role: "Admin" | "Doctor" | "Patient";
  Speciality?: string;
  Bio?: string;
  MeetingPrice?: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData: Partial<User>, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        userData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: {
      Email?: string;
      Username?: string;
      Password?: string;
      token?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      let response;
      if (credentials.token) {
        // If a token is provided, verify it
        response = await axios.get("http://localhost:5000/api/users/session", {
          headers: { Authorization: `Bearer ${credentials.token}` },
        });
      } else {
        // Otherwise, perform normal login
        response = await axios.post(
          "http://localhost:5000/api/users/login",
          credentials
        );
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
       }
      }
      return response.data;
    } catch (error: any) {  
      console.log(error)
      localStorage.removeItem("token"); // Clear invalid token
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<{ user: User }>) => {
          state.loading = false;
          state.user = action.payload.user;
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ token: string; user: User }>) => {
          console.log(action.payload);
          state.loading = false;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          state.user = action.payload.user;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
