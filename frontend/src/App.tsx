import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container } from "@mui/material";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/login/Login";
import ContactForm from "./components/contact/contactForm";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/doctorDashboard/Sidebar";
import Dashboard from "./components/doctorDashboard/Dashboard";
import DoctorProfile from "./components/doctorDashboard/Profile";
import HelloPatient from "./components/patientview/View";
import Footer from "./components/login/Footer";
import Home from "./components/Home/Home";
import DoctorDetails from './components/Home/DoctorDetails';
import ServiceDetails from './components/Home/ServiceDetails';

import ChatRooms from "./components/doctorDashboard/ChatRooms";
// import { blue } from '@mui/material/colors';
const theme = createTheme();


const App: React.FC = () => {
  // const location = useLocation();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Navbar />
            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/doctor-details" element={<DoctorDetails />} />
              <Route path="/service-details" element={<ServiceDetails />} />
              {/* <Route path="/" element={<div>Home </div>} /> */}
              <Route path="/services" element={<div>Services </div>} />
              <Route path="/help" element={<div>Help </div>} />
              <Route path="/blogs" element={<div>Blogs </div>} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/contact" element={<ContactForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chat" element={<ChatRooms />} />
              <Route path="/settings" element={<DoctorProfile />} />
            </Routes>

          
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
