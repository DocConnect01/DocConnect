  import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
  import axios from 'axios';

  export interface Doctor {
    UserID: number;
    FirstName: string;
    LastName: string;
    Speciality: string;
    Bio: string;
    imageUrl: string;
    LocationLatitude: number;
    LocationLongitude: number;
  }

  interface DoctorsState {
    allDoctors: Doctor[];
    searchedDoctors: Doctor[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }

  const initialState: DoctorsState = {
    allDoctors: [],
    searchedDoctors: [],
    status: 'idle',
    error: null,
  };

  export const fetchDoctors = createAsyncThunk('doctors/fetchDoctors', async () => {
    const response = await axios.get('http://localhost:5000/api/doctor2/getAllDoctorsForHome');
    return response.data;
  });

  export const searchDoctors = createAsyncThunk(
    'doctors/searchDoctors',
    async (searchParams: {
      name: string;
      speciality: string;
      available: boolean;
      nearMe: boolean;
      perimeter: number | null;
      latitude?: number;
      longitude?: number;
      coords: { LocationLatitude: number; LocationLongitude: number };
    }, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return rejectWithValue('No authentication token found');
        }
        const response = await axios.post('http://localhost:5000/api/doctor2/searchDoctors', searchParams, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          return rejectWithValue(error.response.data);
        }
        return rejectWithValue('An unexpected error occurred');
      }
    }
  );

  const doctorsSlice = createSlice({
    name: 'doctors',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchDoctors.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchDoctors.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.allDoctors = action.payload;
        })
        .addCase(fetchDoctors.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || 'Failed to fetch doctors';
        })
        .addCase(searchDoctors.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(searchDoctors.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.searchedDoctors = action.payload;
        })
        .addCase(searchDoctors.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || 'Failed to search doctors';
        });
    },
  });

  export default doctorsSlice.reducer;