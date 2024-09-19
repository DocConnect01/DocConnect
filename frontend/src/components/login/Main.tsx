import React from "react";
import { Box, Grid, Container, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import AppointmentRequest from "./AppointmentRequest";
import PatientStats from "./PatientStats";
import TodayAppointments from "./TodayAppointments";
import RecentPatients from "./RecentPatients";
const MainComponent: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={2}>
        <Sidebar />
      </Grid>
      <Grid item xs={10}>
        <Header />
        <Container maxWidth="lg" sx={{ marginTop: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <AppointmentRequest />
            </Grid>
            <Grid item xs={6}>
              <PatientStats />
            </Grid>
            <Grid item xs={6}>
              <TodayAppointments />
            </Grid>
            <Grid item xs={12}>
              <RecentPatients />
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
};

export default MainComponent;
