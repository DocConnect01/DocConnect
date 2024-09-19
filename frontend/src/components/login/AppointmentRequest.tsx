import React from "react";
import {   Typography, Card, CardContent, Button, Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

const appointments = [
  { name: "Bogdan Krivchenko", time: "45 Male, 12 April 8:30", status: "Declined" },
  { name: "Jenny Wilson", time: "Female, 25 April 10:30 AM", status: "Confirmed" },
  { name: "Dianne Russell", time: "Female, 35 May 1:30 PM", status: "Confirmed" },
  { name: "John Doe", time: "Male, 10 June 9:00 AM", status: "Pending" }
  

];

const AppointmentRequest: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Appointment Request</Typography>
        <List>
          {appointments.map((appointment, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText primary={appointment.name} secondary={appointment.time} />
              <Button variant="contained" color={appointment.status === "Confirmed" ? "primary" : "secondary"}>
                {appointment.status}
              </Button>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default AppointmentRequest;