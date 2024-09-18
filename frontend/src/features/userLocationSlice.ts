import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserLocationState {
  latitude: number | null;
  longitude: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserLocationState = {
  latitude: null,
  longitude: null,
  loading: false,
  error: null,
};

const userLocationSlice = createSlice({
  name: 'userLocation',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<{ latitude: number; longitude: number }>) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLocation, setLoading, setError } = userLocationSlice.actions;
export default userLocationSlice.reducer;