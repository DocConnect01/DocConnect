import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  setFirstName,
  setEmail,
  setPassword,
  setConfirmPassword,
  resetForm,
  setUserType,
} from "../../features/formSlice";
import {
  TextField,
  Button,
  Box,
  Typography,
  Link,
  Grid2,
  Select,
  MenuItem,
} from "@mui/material";

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
    <Box sx={{ height: "100%", padding: 15 }}>
      <Box
        display="flex"
        sx={{ boxShadow: 3, borderRadius: 2, height: "75vh" }}
      >
        <Box
          sx={{
            flex: 1,
            paddings: 0,
            backgroundColor: "primary.main",
          }}
        >
          <img
            src="https://www.ekathimerini.com/wp-content/uploads/2020/11/doctor-thumb-large-958x600.jpg"
            alt="Side Image"
            style={{
              maxWidth: "100%",
              height: "100%",
            }}
          />
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: "white",
            p: 4,
            flex: 1,
            height: 345, // Adjust height as needed

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
            <>
              <TextField
                label="Confirm Password"
                type="password"
                value={formState.confirmPassword}
                onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
                fullWidth
                required
              />
              <Select
                label="User Type"
                value={formState.userType}
                onChange={(e) =>
                  dispatch(setUserType(e.target.value as string))
                }
                fullWidth
                required
              >
                <MenuItem value="patient">Patient</MenuItem>
                <MenuItem value="doctor">Doctor</MenuItem>
              </Select>
            </>
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
      </Box>
    </Box>
  );
};

export default LoginForm;
