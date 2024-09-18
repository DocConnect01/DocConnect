import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialState: FormState = {
  firstName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const {
  setFirstName,
  setEmail,
  setPassword,
  setConfirmPassword,
  resetForm,
} = formSlice.actions;
export default formSlice.reducer;
