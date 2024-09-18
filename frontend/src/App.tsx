import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "../src/components/login/Login";
import Home from "./pages/Home";
import UserLocation from "./components/user/UserLocation";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/location" element={<UserLocation/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;