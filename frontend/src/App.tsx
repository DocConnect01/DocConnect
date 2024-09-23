import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/login/Login";
import ContactForm from "./components/contact/contactForm";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/doctorDashboard/Sidebar";
import Dashboard from "./components/doctorDashboard/Dashboard";
import ChatInterface from "./components/doctorDashboard/Chat";
import DoctorProfile from "./components/doctorDashboard/Profile";
import Services from "./components/Services";
import PatientProfile from "./components/userProfile/PatientProfile";
import Footer from "./components/login/Footer";

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
              <Route path="/" element={<div>Home </div>} />
              <Route path="/services" element={<Services />} />
              <Route path="/help" element={<div>Help </div>} />
              <Route path="/blogs" element={<div>Blogs </div>} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/contact" element={<ContactForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chat" element={<ChatInterface />} />
              <Route path="/settings" element={<DoctorProfile />} />
              <Route path="/profile" element={<PatientProfile />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
