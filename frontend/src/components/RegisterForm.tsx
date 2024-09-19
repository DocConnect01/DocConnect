import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../src/store/store";
import { useNavigate } from "react-router-dom";
import {
  setFirstName,
  setEmailOrUsername,
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
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch();
  const formState = useSelector((state: RootState) => state.form);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [bio, setBio] = useState("");
  const [meetingPrice, setMeetingPrice] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formState.password !== formState.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          FirstName: formState.firstName,
          LastName: "",
          Username: formState.Username,
          Password: formState.password,
          Email: formState.Username,
          Role: formState.userType === "doctor" ? "Doctor" : "Patient",
          Specialty: formState.userType === "doctor" ? specialty : "",
          Bio: formState.userType === "doctor" ? bio : "",
          MeetingPrice: formState.userType === "doctor" ? meetingPrice : "",
        }
      );

      if (response.status === 201) {
        console.log("Registration successful");
        navigate("/login");
        dispatch(resetForm());
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(
          error.response.data.message || "An error occurred during registration"
        );
      } else {
        setError("An unexpected error occurred");
      }
      console.error("Registration error:", error);
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
          maxWidth: 1000,
          display: "flex",
          backgroundColor: "white",
        }}
      >
        <Box sx={{ flex: 1, display: { xs: "none", md: "block" } }}>
          <img
            src="https://medikit-nextjs.vercel.app/_next/static/media/signup-bg.9daac4a8.jpg"
            alt="Side Image"
            style={{
              maxWidth: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 4,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Register Here
          </Typography>

          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}

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
            value={formState.Username}
            onChange={(e) => dispatch(setEmailOrUsername(e.target.value))}
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

          <FormControl fullWidth variant="outlined" required>
            <InputLabel id="user-type-label">User Type</InputLabel>
            <Select
              labelId="user-type-label"
              id="user-type-select"
              value={formState.userType}
              onChange={(e) => dispatch(setUserType(e.target.value))}
              label="User Type"
            >
              <MenuItem value="patient">Patient</MenuItem>
              <MenuItem value="doctor">Doctor</MenuItem>
            </Select>
          </FormControl>

          {formState.userType === "doctor" && (
            <>
              <TextField
                label="Specialty"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                fullWidth
                required
              />

              <TextField
                label="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                fullWidth
                multiline
                rows={3}
              />

              <TextField
                label="Meeting Price"
                type="number"
                value={meetingPrice}
                onChange={(e) => setMeetingPrice(e.target.value)}
                fullWidth
              />
            </>
          )}

          <Button type="submit" variant="contained" size="large" fullWidth>
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
