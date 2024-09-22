import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Service {
  id: number;
  title: string;
  description: string;
}

interface ServicesState {
  services: Service[];
}

const initialState: ServicesState = {
  services: [
    {
      id: 1,
      title: "Dental treatments",
      description: "Comprehensive dental care for all ages.",
    },
    {
      id: 2,
      title: "Bones treatments",
      description: "Advanced treatments for bone health and injuries.",
    },
    {
      id: 3,
      title: "Diagnosis",
      description: "Accurate diagnostics for various health conditions.",
    },
    {
      id: 4,
      title: "Cardiology",
      description: "Expert heart care and cardiology services.",
    },
    {
      id: 5,
      title: "Surgery",
      description: "State-of-the-art surgical procedures and care.",
    },
    {
      id: 6,
      title: "Eye care",
      description: "Comprehensive eye exams and treatments.",
    },
  ],
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
});

export default servicesSlice.reducer;
