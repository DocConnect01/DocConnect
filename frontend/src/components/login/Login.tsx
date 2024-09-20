import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import {
  setEmailOrUsername,
  setPassword,
  resetForm,
} from "../../features/formSlice";
import {
  TextField,
  Button,
  Box,
  Typography,
  Link,
  IconButton,
  Stack,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Facebook, LinkedIn, Twitter } from "@mui/icons-material";
import axios from "axios";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
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
      } else {
        setErrorMessage("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          display: "flex",
          boxShadow: 3,
          borderRadius: 2,
          width: "75%",
          maxWidth: "1200px",
          overflow: "hidden",
          backgroundColor: "#fff",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: { xs: "none", md: "block" },
            backgroundImage: `url('https://medikit-nextjs.vercel.app/_next/static/media/signup-bg.9daac4a8.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            flex: 1,
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Login Here
          </Typography>

          {errorMessage && (
            <Typography variant="body2" color="error" align="center">
              {errorMessage}
            </Typography>
          )}

          <TextField
            label="First Name"
            value={formState.Username}
            onChange={(e) => dispatch(setEmailOrUsername(e.target.value))}
            fullWidth
            margin="normal"
            error={!!formErrors.Username}
            helperText={formErrors.Username}
          />

          <TextField
            label="Your Email"
            value={formState.Username}
            onChange={(e) => dispatch(setEmailOrUsername(e.target.value))}
            fullWidth
            margin="normal"
            error={!!formErrors.Username}
            helperText={formErrors.Username}
          />

          <TextField
            label="Password"
            type="password"
            value={formState.password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            fullWidth
            margin="normal"
            error={!!formErrors.password}
            helperText={formErrors.password}
          />

          <TextField
            label="Confirm Password"
            type="password"
            value={formState.password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            fullWidth
            margin="normal"
            error={!!formErrors.password}
            helperText={formErrors.password}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ mt: 2, mb: 2 }}
          >
            {loading ? "Logging In..." : "Login"}
          </Button>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <FormControlLabel
              control={<Checkbox name="remember" color="primary" />}
              label="Remember me"
            />
            <Link href="#" variant="body2">
              Lost your password?
            </Link>
          </Box>

          <Box textAlign="center" mt={2}>
            <Typography variant="body2">
              Didn't you account yet?
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
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
