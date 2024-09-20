import React from "react";
import { Box, Container } from "@mui/material";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/doctorDashboard/Sidebar";
import Dashboard from "./components/doctorDashboard/Dashboard";
import LoginForm from "./components/login/Login";
import ChatInterface from "./components/doctorDashboard/Chat";
import DoctorProfile from "./components/doctorDashboard/Profile";
// import HealthcareLanding from "./components/landingPage/Landing";
import RegisterForm from "./components/RegisterForm";
import Footer from "./components/login/Footer";

const App: React.FC = () => {
  const location = useLocation();

  return (
<<<<<<< HEAD
    <BrowserRouter>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Routes>
          
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
    
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
=======
    <Box sx={{ display: "flex" }}>
      {location.pathname === "/dashboard" && <Sidebar />}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat" element={<ChatInterface />} />
            <Route path="/settings" element={<DoctorProfile />} />
            {/* <Route path="/" element={<HealthcareLanding />} /> */}
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
};

const AppWrapper: React.FC = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
>>>>>>> ebe9c30a477c476151f4758a0955d9d291f3beea
