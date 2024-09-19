import React from "react";

import ConfirmationModal from "./components/Appointment/ConfirmationModal"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "../src/components/login/Login";
import Home from "./pages/Home";
import AppointmentCalendar from "./components/Appointment/AppointmentCalendar";
import RegisterForm from "./components/RegisterForm";
import Footer from "./components/login/Footer";


const App: React.FC = () => {
  return (
 
<BrowserRouter>
<div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >

<Routes>

<Route path="/login" element={<LoginForm />} />
<Route path="/register" element={<RegisterForm />} />
  <Route path="/home" element= {<Home/>}/>
  <Route path="/appointment" element={<AppointmentCalendar DoctorID="1" />} />
      
  <Route path="/appointment/confirmation" element={
   <ConfirmationModal
   open={true} 
   onClose={() => {}}
   onConfirm={() => {}}
   appointmentDetails={{ doctorId: '1', patientId: '123', slot: '10:00 AM' }}
/>
  } />


</Routes>
</div>
</BrowserRouter>

  );
};

export default App;





