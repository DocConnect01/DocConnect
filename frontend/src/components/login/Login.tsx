import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import {
  setEmailOrUsername,
  setPassword,
  resetForm,
} from "../../features/formSlice";
import { login } from "../../features/authSlice";
import {
  TextField,
  Button,
  Box,
  Typography,
  Link,
  IconButton,
  Stack,
} from "@mui/material";
import { Facebook, LinkedIn, Twitter, GitHub } from "@mui/icons-material";
import { AppDispatch } from "../../store/store";
import axios from 'axios';

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const formState = useSelector((state: RootState) => state.form);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formState.Username) {
      errors.Username = "Username is required";
    }
    if (!formState.password) {
      errors.password = "Password is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setErrorMessage(null);
    setLoading(true);

    try {
      console.log("Attempting login with:", { Email: formState.Username, Password: formState.password });
      const result = await dispatch(login({
        Email: formState.Username,
        Password: formState.password
      })).unwrap();

      // console.log("Full login result:", JSON.stringify(result, null, 2));

      if (result.token) {
        localStorage.setItem("token", result.token);
        
        try {
          const response = await axios.get('http://localhost:5000/api/users/check-doctor', {
            headers: { Authorization: `Bearer ${result.token}` }
          });
          const response2 = await axios.get('http://localhost:5000/api/users/check-patient', {
            headers: { Authorization: `Bearer ${result.token}` }
          });
          
          const isDoctor = response.data.isDoctor;
          const isPatient = response2.data.isPatient;
          console.log("Is Doctor:", isDoctor);
          console.log("Is Patient:", isPatient);

          if (isDoctor) {
            console.log("Navigating to dashboard");
            navigate("/dashboard");
          } else if (isPatient) {
            console.log("Navigating to patient view");
            navigate("/patientview");
          }
        } catch (error) {
          console.error("Error checking doctor status:", error);
          setErrorMessage("Error determining user type");
        }

        dispatch(resetForm());
      } else {
        setErrorMessage("Login failed: No token received");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setErrorMessage(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
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
            padding: 0,
            backgroundColor: "primary.main",
          }}
        >
          <img
            src="https://medikit-nextjs.vercel.app/_next/static/media/signup-bg.9daac4a8.jpg"
            alt="Side Image"
            aria-label="Decorative side image"
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
            backgroundColor: "#fff",
            p: 4,
            flex: 1,
            height: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: 2,
            boxShadow: 3,
            maxWidth: 400,
            mx: "auto",
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
            error={!!formErrors.Username}
            helperText={formErrors.Username}
          />

          <TextField
            label="Password"
            type="password"
            value={formState.password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            fullWidth
            required
            error={!!formErrors.password}
            helperText={formErrors.password}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
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

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Or sign in with:
          </Typography>
          <Stack direction="row" justifyContent="center" spacing={2}>
            <IconButton
              aria-label="Sign in with Facebook"
              href="https://www.facebook.com"
            >
              <Facebook sx={{ color: "#3b5998" }} />
            </IconButton>
            <IconButton
              aria-label="Sign in with LinkedIn"
              href="https://www.linkedin.com"
            >
              <LinkedIn sx={{ color: "#0077b5" }} />
            </IconButton>
            <IconButton
              aria-label="Sign in with Twitter"
              href="https://www.twitter.com"
            >
              <Twitter sx={{ color: "#1da1f2" }} />
            </IconButton>
            <IconButton
              aria-label="Sign in with GitHub"
              href="https://github.com"
            >
              <GitHub sx={{ color: "#333" }} />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;