import React from 'react';
import { Grid, Typography, Paper, Box } from '@mui/material';
import StatCard from './StatCard';
import AppointmentList from './AppointmentList';
import PatientChart from './PatientChart';
import RecentPatients from './RecentPatients';

const Dashboard: React.FC = () => {
  return (
    
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, Dr. Stephen
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Have a nice day at great work!
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Appointments" value="24.4k" color="#8e44ad" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Patients" value="166.3k" color="#e74c3c" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Clinic Consulting" value="53.5k" color="#f39c12" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Video Consulting" value="28.0k" color="#3498db" />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <AppointmentList />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <PatientChart />
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <RecentPatients />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;