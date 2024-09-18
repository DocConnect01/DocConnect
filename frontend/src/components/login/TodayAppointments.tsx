import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const appointments = [
  { name: "Jhon Smith", time: "Clinic Consulting - Ongoing" },
  { name: "Frank Murray", time: "Vedio Consulting - 10:25" },
  { name: "Ella Lucia", time: "Emergency - 11:30" },
  // Add more entries...
];

const TodayAppointments: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Today Appointments</Typography>
        <List>
          {appointments.map((appointment, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={appointment.name}
                secondary={appointment.time}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TodayAppointments;