import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import {
  setFirstName,
  setEmail,
  resetProfile,
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
  Avatar,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

const PatientProfile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileState = useSelector((state: RootState) => state.profile);
  const [loading, setLoading] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        dispatch(setFirstName(response.data.firstName));
        dispatch(setEmail(response.data.email));
        setProfilePicture(response.data.profilePicture);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch profile", error);
        setNotification({
          open: true,
          message: "Failed to load profile",
          severity: "error",
        });
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
      setNotification({
        open: true,
        message: "Profile updated successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Failed to update profile", error);
      setNotification({
        open: true,
        message: "Failed to update profile",
        severity: "error",
      });
    }
  };

  const handleDeleteProfile = async () => {
    try {
      await axios.delete(`/api/users/${userId}`);
      localStorage.removeItem("userId");
      dispatch(resetProfile());
      navigate("/register");
      setNotification({
        open: true,
        message: "Account deleted successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Failed to delete profile", error);
      setNotification({
        open: true,
        message: "Failed to delete account",
        severity: "error",
      });
    }
  };

  const handleProfilePictureUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await axios.post(
          `/api/users/${userId}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setProfilePicture(response.data.url);
        setUploading(false);
        setNotification({
          open: true,
          message: "Profile picture updated",
          severity: "success",
        });
      } catch (error) {
        console.error("Failed to upload profile picture", error);
        setUploading(false);
        setNotification({
          open: true,
          message: "Failed to upload profile picture",
          severity: "error",
        });
      }
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Patient Profile
      </Typography>
      <Box display="flex" alignItems="center" flexDirection="column">
        <Avatar
          src={profilePicture || "/default-profile.png"}
          sx={{ width: 100, height: 100 }}
        />
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="upload-profile-picture"
          onChange={handleProfilePictureUpload}
        />
        <label htmlFor="upload-profile-picture">
          <IconButton component="span" disabled={uploading}>
            <EditIcon />
          </IconButton>
        </label>
      </Box>
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
            {/* Are you sure you want to delete your account? This action cannot be */}
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
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PatientProfile;
