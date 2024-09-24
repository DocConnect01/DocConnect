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
import DoctorAvailability from "./components/doctorDashboard/DoctorAvailability";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

// Create theme
import HelloPatient from "./components/patientview/View";
import Home from "./components/Home/Home";
import DoctorDetails from './components/Home/DoctorDetails';
import ServiceDetails from './components/Home/ServiceDetails';
import UserAccountProfile from "./components/Home/UserAccountProfile";

import ChatRooms from "./components/doctorDashboard/ChatRooms";
import UserProfileUpload from "./components/Home/UserProfileUpload";
const theme = createTheme();

// Layout for routes that include the sidebar
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const Role = useSelector((state: RootState) => state.Auth.user?.Role);
  console.log(Role);
  return (
    <Box sx={{ display: "flex" }}>
      {location.pathname === "/dashboard" && <Sidebar />}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="xl">{children}</Container>
      </Box>
    </Box>
  );
};

const App: React.FC = () => {
  const Role = useSelector((state: RootState) => state.Auth.user?.Role);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />
            <Routes>
              <Route path="/services" element={<div>Services</div>} />
              <Route path="/help" element={<div>Help</div>} />
              <Route path="/blogs" element={<div>Blogs</div>} />

              <Route path="/" element={<Home />} />
              <Route path="/doctor-details/:doctorId" element={<DoctorDetails />} />
              <Route path="/service-details" element={<ServiceDetails />} />
              <Route path="/services" element={<div>Services </div>} />
              <Route path="/help" element={<div>Help </div>} />
              <Route path="/blogs" element={<div>Blogs </div>} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/contact" element={<ContactForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chat" element={<ChatRooms />} />
              <Route path="/settings" element={<DoctorProfile />} />
              <Route path="/doctor/availability" element={<DoctorAvailability />} />
              <Route path="/upload-profile" element={<UserProfileUpload />} />
              <Route path="/account-profile" element={<UserAccountProfile />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;