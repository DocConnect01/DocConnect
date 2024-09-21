import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FindDoctorState {
  name: string;
  speciality: string;
  available: boolean;
}

const initialState: FindDoctorState = {
  name: '',
  speciality: '',
  available: false,
};

const findDoctorSlice = createSlice({
  name: 'findDoctor',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setSpeciality: (state, action: PayloadAction<string>) => {
      state.speciality = action.payload;
    },
    setAvailable: (state, action: PayloadAction<boolean>) => {
      state.available = action.payload;
    },
  },
});

export const { setName, setSpeciality, setAvailable } = findDoctorSlice.actions;
export default findDoctorSlice.reducer;