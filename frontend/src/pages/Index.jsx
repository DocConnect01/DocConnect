import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import ContactForm from "../components/ContactForm";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme();

const Index = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <ContactForm />
        </div>
      </ThemeProvider>
    </Provider>
  );
};

export default Index;
