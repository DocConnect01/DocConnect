import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import DoctorCard from './DoctorCard';

const DoctorsWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(10, 0),
}));

const TitleWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(6),
}));

const GradientTitle = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #1976d2, #2196f3)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 700,
  fontSize: '3rem',
  marginBottom: theme.spacing(2),
}));

const AllDoctors: React.FC = () => {
  const doctors = [
    { name: 'Dr. John Doe', specialty: 'Cardiologist', imageUrl: '/path/to/image1.jpg' },
    { name: 'Dr. Jane Smith', specialty: 'Pediatrician', imageUrl: '/path/to/image2.jpg' },
    { name: 'Dr. Mike Johnson', specialty: 'Neurologist', imageUrl: '/path/to/image3.jpg' },
    { name: 'Dr. Sarah Brown', specialty: 'Dermatologist', imageUrl: '/path/to/image4.jpg' },
  ];

  return (
    <DoctorsWrapper>
      <Container maxWidth="lg">
        <TitleWrapper>
          <GradientTitle variant="h2" align="center">
            Our Doctors
          </GradientTitle>
        </TitleWrapper>
        <Grid container spacing={4}>
          {doctors.map((doctor, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <DoctorCard name={doctor.name} specialty={doctor.specialty} imageUrl={doctor.imageUrl} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </DoctorsWrapper>
  );
};

export default AllDoctors;