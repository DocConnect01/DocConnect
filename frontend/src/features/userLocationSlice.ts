import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserLocation {
  latitude: number | null;
  longitude: number | null;
  placeName: string;
  loading: boolean;
  error: string | null;
}

const initialState: UserLocation = {
  latitude: null,
  longitude: null,
  placeName: '',
  loading: false,
  error: null,
};

export const updateUserLocation = createAsyncThunk(
  'userLocation/updateUserLocation',
  async (coords: { latitude: number; longitude: number }, { rejectWithValue }) => {
    try {
      await axios.put('/api/auth/update-location', coords);
      const response = await axios.get(`/api/auth/get-place-name?latitude=${coords.latitude}&longitude=${coords.longitude}`);
      return { ...coords, placeName: response.data.placeName };
    } catch (error) {
      return rejectWithValue('Failed to update location');
    }
  }
);

const userLocationSlice = createSlice({
  name: 'userLocation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.latitude = action.payload.latitude;
        state.longitude = action.payload.longitude;
        state.placeName = action.payload.placeName;
      })
      .addCase(updateUserLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userLocationSlice.reducer;