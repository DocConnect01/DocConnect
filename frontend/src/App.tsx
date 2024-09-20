import React from "react";
import { Box, Container } from "@mui/material";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/doctorDashboard/Sidebar";
import Dashboard from "./components/doctorDashboard/Dashboard";
import LoginForm from "./components/login/Login";
// import ChatInterface from "./components/doctorDashboard/Chat";
import DoctorProfile from "./components/doctorDashboard/Profile";
import HelloPatient from "./components/patientview/View";
import RegisterForm from "./components/RegisterForm";
import Footer from "./components/login/Footer";
import ChatRooms from "./components/doctorDashboard/ChatRooms";
import ChatMessages from "./components/doctorDashboard/ChatMessages";
import { useParams } from "react-router-dom";
const ChatMessagesWrapper = () => {
  const { roomId } = useParams();
  return <ChatMessages roomId={roomId || ""} />;
};
const App: React.FC = () => {
  const location = useLocation();

  return (
    <Box sx={{ display: "flex" }}>
      {location.pathname !== "/login" && location.pathname !== "/register" && <Sidebar />}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/chat" element={<ChatInterface />} /> */}
            <Route path="/settings" element={<DoctorProfile />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/patientview" element={<HelloPatient />} />
            <Route path="/chatrooms" element={<ChatRooms />} />
            <Route path="/chatmessages/:roomId" element={<ChatMessagesWrapper />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
};

// ... rest of the file remains unchanged

const AppWrapper: React.FC = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
