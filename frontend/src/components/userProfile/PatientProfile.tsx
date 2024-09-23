import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import {
  setFirstName,
  setEmail,
  //   resetProfile,:
} from "../../features/profileSlice";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";

const PatientProfile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileState = useSelector((state: RootState) => state.profile);
  const [loading, setLoading] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        dispatch(setFirstName(response.data.firstName));
        dispatch(setEmail(response.data.email));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch profile", error);
        setLoading(false);
      }
    };
    fetchProfile();
  }, [dispatch, userId]);

  const handleUpdateProfile = async () => {
    try {
      const updatedData = {
        firstName: profileState.firstName,
        email: profileState.email,
      };
      const response = await axios.put(`/api/users/${userId}`, updatedData);
      dispatch(setFirstName(response.data.firstName));
      dispatch(setEmail(response.data.email));
      setEditMode(false);
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      await axios.delete(`/api/users/${userId}`);
      localStorage.removeItem("userId");
      navigate("/register");
    } catch (error) {
      console.error("Failed to delete profile", error);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Patient Profile
      </Typography>
      <Box>
        {editMode ? (
          <Box>
            <TextField
              label="First Name"
              value={profileState.firstName}
              onChange={(e) => dispatch(setFirstName(e.target.value))}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              type="email"
              value={profileState.email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              fullWidth
              margin="normal"
            />
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdateProfile}
                >
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box>
            <Typography variant="h6">
              First Name: {profileState.firstName}
            </Typography>
            <Typography variant="h6">Email: {profileState.email}</Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item>
                <Button variant="contained" onClick={() => setEditMode(true)}>
                  Edit Profile
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setOpenDeleteDialog(true)}
                >
                  Delete Account
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteProfile} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PatientProfile;
