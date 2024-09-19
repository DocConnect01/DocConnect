import React from "react";

import ConfirmationModal from "./components/Appointment/ConfirmationModal"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "../src/components/login/Login";
import Home from "./pages/Home";
import AppointmentCalendar from "./components/Appointment/AppointmentCalendar";
const App: React.FC = () => {
  return (
 
<BrowserRouter>
<Routes>
  <Route path="/login" element= {<LoginForm/>}/>
  <Route path="/home" element= {<Home/>}/>
  <Route path="/appointment" element={<AppointmentCalendar DoctorID="1" />} />
      
  <Route path="/appointment/confirmation" element={
   <ConfirmationModal
   open={true} // or false, depending on your logic
   onClose={() => {}}
   onConfirm={() => {}}
   appointmentDetails={{ doctorId: '1', patientId: '123', slot: '10:00 AM' }}
/>
  } />


</Routes>

</BrowserRouter>

  );
};

export default App;
