import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RootState } from '../../store/store';
import { Doctor } from '../../features/HomeSlices/doctorsSlice';
import { Box, Container, Typography, Button, Grid, TextField, Paper } from '@mui/material';
import { styled } from '@mui/system';

const HeroWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(5, 0),
}));

const GradientTitle = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #1976d2, #2196f3)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 700,
  fontSize: '2.5rem',
}));

const ImageFrame = styled(Box)({
  width: '100%',
  height: '400px',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '8px',
  marginBottom: '20px',
});

const StyledImg = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const AppointmentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
}));

const DoctorDetails: React.FC = () => {
  const selectedDoctor = useSelector<RootState, Doctor | null>(state => state.selectedDoctor);
  const navigate = useNavigate();

  if (!selectedDoctor) {
    return <Typography>No doctor selected</Typography>;
  }

  const handleMessageClick = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/chats/chatroom/${selectedDoctor.FirstName}`);
      console.log('API Response:', response.data);
      const chatroomId = response.data.chatroomId;
      navigate('/chat', { state: { chatroomId } });
    } catch (error) {
      console.error('Error creating chatroom:', error);
      if (axios.isAxiosError(error)) {
        console.error('Error details:', error.response?.data);
      }
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <HeroWrapper>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <GradientTitle variant="h1">
              {`${selectedDoctor.FirstName} ${selectedDoctor.LastName}`}
            </GradientTitle>
            <Typography variant="h5" color="textSecondary" gutterBottom>
              {selectedDoctor.Speciality}
            </Typography>
            <ImageFrame>
              <StyledImg src={selectedDoctor.imageUrl} alt={`${selectedDoctor.FirstName} ${selectedDoctor.LastName}`} />
            </ImageFrame>
            <Typography variant="body1" paragraph>
              <strong>BIO: </strong>{selectedDoctor.Bio}
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>Contact Information</Typography>
              <Typography>Email: {selectedDoctor.Email}</Typography>
              <Typography>Phone: (123) 456-7890</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleMessageClick}
                sx={{ mt: 2 }}
              >
                Message
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <AppointmentPaper elevation={3}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                Book Appointment
              </Typography>
              <TextField fullWidth label="Name" margin="normal" variant="outlined" />
              <TextField fullWidth label="Email" margin="normal" variant="outlined" />
              <TextField fullWidth label="Phone" margin="normal" variant="outlined" />
              <TextField
                fullWidth
                label="Preferred Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                margin="normal"
                variant="outlined"
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2, py: 1.5, fontSize: '1.1rem', fontWeight: 'bold' }}
              >
                BOOK APPOINTMENT
              </Button>
            </AppointmentPaper>
          </Grid>
        </Grid>
      </Container>
    </HeroWrapper>
  );
};

export default DoctorDetails;