import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  firstName: string;
  email: string;
}

const initialState: ProfileState = {
  firstName: "",
  email: "",
  //
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setFirstName(state, action: PayloadAction<string>) {
      state.firstName = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    resetProfile(state) {
      return initialState;
    },
  },
});

export const { setFirstName, setEmail, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
