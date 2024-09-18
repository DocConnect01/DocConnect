import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  setFirstName,
  setEmail,
  setPassword,
  setConfirmPassword,
  resetForm,
} from "../../features/formSlice";
import { TextField, Button, Box, Typography, Link, Grid2 } from "@mui/material";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const formState = useSelector((state: RootState) => state.form);

  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      console.log("Register form submitted", formState);
    } else {
      console.log("Login form submitted", formState);
    }
    dispatch(resetForm());
  };

  return (
    <Grid2
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      style={{
        height: "100vh",
        backgroundImage: "url(/_next/static/media/signup-bg.9daac4a8.jpg)",
        backgroundSize: "cover",
      }}
    >
      <Grid2 >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: "white",
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h5" align="center">
            {isRegister ? "Register Here" : "Login Here"}
          </Typography>

          <TextField
            label="First Name"
            value={formState.firstName}
            onChange={(e) => dispatch(setFirstName(e.target.value))}
            fullWidth
            required={isRegister}
          />
          <TextField
            label="Your Email"
            type="email"
            value={formState.email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            fullWidth
            required
          />
          <TextField
            label="Password"
            type="password"
            value={formState.password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            fullWidth
            required
          />
          {isRegister && (
            <TextField
              label="Confirm Password"
              type="password"
              value={formState.confirmPassword}
              onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
              fullWidth
              required
            />
          )}
          <Button type="submit" variant="contained" fullWidth>
            {isRegister ? "Register" : "Login"}
          </Button>

          <Box textAlign="center">
            <Typography variant="body2">
              {isRegister
                ? "Already have an account?"
                : "Don't have an account yet?"}
              <Link
                component="button"
                variant="body2"
                onClick={() => setIsRegister(!isRegister)}
                sx={{ ml: 1 }}
              >
                {isRegister ? "Login Here" : "Register Here"}
              </Link>
            </Typography>
          </Box>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default LoginForm;
