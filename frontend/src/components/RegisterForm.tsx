import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../src/store/store";
import { useNavigate } from "react-router-dom";
import {
  setFirstName,
  setEmail,
  setPassword,
  setConfirmPassword,
  setUserType,
  resetForm,
} from "../../src/features/formSlice";
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  Link,
} from "@mui/material";

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch();
  const formState = useSelector((state: RootState) => state.form);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register form submitted", formState);
    // Perform registration action here
    navigate("/login"); // Redirect after registration
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
            src="https://medikit-nextjs.vercel.app/_next/static/media/signup-bg.9daac4a8.jpg"
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
            height: 345,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h5" align="center">
            Register Here
          </Typography>

          <TextField
            label="First Name"
            value={formState.firstName}
            onChange={(e) => dispatch(setFirstName(e.target.value))}
            fullWidth
            required
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
            onChange={(e) => dispatch(setUserType(e.target.value as string))}
            fullWidth
            required
          >
            <MenuItem value="patient">Patient</MenuItem>
            <MenuItem value="doctor">Doctor</MenuItem>
          </Select>

          <Button type="submit" variant="contained" fullWidth>
            Register
          </Button>

          <Box textAlign="center">
            <Typography variant="body2">
              Already have an account?
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/login")}
                sx={{ ml: 1 }}
              >
                Login Here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterForm;
