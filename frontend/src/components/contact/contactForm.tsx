import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import { updateField, resetForm } from "../../features/contactFormSlice";
import { RootState } from "../../store/store";
import { SelectChangeEvent } from "@mui/material";
import ContactImage from "../../assets/images/ielts-listening-form-completion_1.webp";

const ContactForm: React.FC = () => {
  const dispatch = useDispatch();
  const formState = useSelector((state: RootState) => state.contactForm);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;
    dispatch(updateField({ [name]: value }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateField({ acceptTerms: event.target.checked }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted:", formState);
    dispatch(resetForm());
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        margin: "auto",
        mt: 4,
        padding: 2,
        border: "1px solid #ddd",
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Avatar
          alt="Contact Us"
          src={ContactImage}
          sx={{ width: 100, height: 100 }}
        />
      </Box>
      <Typography variant="h4" gutterBottom textAlign="center">
        Contact Us
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="First name"
        name="firstName"
        value={formState.firstName}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Last name"
        name="lastName"
        value={formState.lastName}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        name="email"
        type="email"
        value={formState.email}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Phone number"
        name="phoneNumber"
        value={formState.phoneNumber}
        onChange={handleChange}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Choose a topic</InputLabel>
        <Select
          value={formState.topic}
          label="Choose a topic"
          name="topic"
          onChange={handleChange}
        >
          <MenuItem value="general">General Inquiry</MenuItem>
          <MenuItem value="support">Technical Support</MenuItem>
          <MenuItem value="billing">Billing Question</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        margin="normal"
        label="Message"
        name="message"
        multiline
        rows={4}
        value={formState.message}
        onChange={handleChange}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formState.acceptTerms}
            onChange={handleCheckboxChange}
            name="acceptTerms"
          />
        }
        label="I accept the terms"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        disabled={!formState.acceptTerms}
      >
        Submit
      </Button>
    </Box>
  );
};

export default ContactForm;
