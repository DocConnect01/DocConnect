import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/login/Login";
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
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
