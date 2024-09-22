import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface ServicesState {
  services: Service[];
}

const initialState: ServicesState = {
  services: [
    {
      id: 1,
      title: "Dental treatments",
      description: "Lorem ipsum...",
      image: "dental.jpg",
    },
    {
      id: 2,
      title: "Bones treatments",
      description: "Lorem ipsum...",
      image: "bones.jpg",
    },
    {
      id: 3,
      title: "Diagnosis",
      description: "Lorem ipsum...",
      image: "diagnosis.jpg",
    },
    {
      id: 4,
      title: "Cardiology",
      description: "Lorem ipsum...",
      image: "cardiology.jpg",
    },
    {
      id: 5,
      title: "Surgery",
      description: "Lorem ipsum...",
      image: "surgery.jpg",
    },
    {
      id: 6,
      title: "Eye care",
      description: "Lorem ipsum...",
      image: "eye.jpg",
    },
  ],
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
});

export default servicesSlice.reducer;
