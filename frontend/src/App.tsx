// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/login/Login";
import ContactForm from "./components/contact/contactForm";
import Navbar from "./components/navbar/Navbar";

const theme = createTheme();

const App: React.FC = () => {
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
              <Route path="/services" element={<div>Services </div>} />
              <Route path="/help" element={<div>Help </div>} />
              <Route path="/blogs" element={<div>Blogs </div>} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/contact" element={<ContactForm />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
