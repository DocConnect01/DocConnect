import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import {
  setEmailOrUsername,
  setPassword,
  resetForm,
} from "../../features/formSlice";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import axios from "axios";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const formState = useSelector((state: RootState) => state.form);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          Username: formState.Username,
          Password: formState.password,
        }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);

        navigate("/dashboard");
        dispatch(resetForm());
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response;
        if (status === 404 || status === 401) {
          setErrorMessage(data.message);
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      }
    }
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
            Login Here
          </Typography>

          {errorMessage && (
            <Typography variant="body2" color="error" align="center">
              {errorMessage}
            </Typography>
          )}

          <TextField
            label="Email or Username"
            type="text"
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

          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>

          <Box textAlign="center">
            <Typography variant="body2">
              Don't have an account yet?
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/register")}
                sx={{ ml: 1 }}
              >
                Register Here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
