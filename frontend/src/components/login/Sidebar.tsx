import React from "react";
import { Box, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PeopleIcon from '@mui/icons-material/People';
import PaymentIcon from "@mui/icons-material/Payment";
import MessageIcon from "@mui/icons-material/Message";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import AppointmentCalendar from "../Appointment/AppointmentCalendar";
const Sidebar: React.FC = () => {
  return (
    <Box sx={{ height: "100vh", backgroundColor: "#F4F5F7", padding: 2 }}>
      <List>
        {[
          { text: "Overview", icon: <DashboardIcon />, route: "/overview" },
          { text: "Appointment", icon: <CalendarTodayIcon />, route: "/appointment" },
          { text: "My Patients", icon: <PeopleIcon />, route: "/mypatients" },
          { text: "Payments", icon: <PaymentIcon />, route: "/payments" },
          { text: "Message", icon: <MessageIcon />, route: "/message" },
          { text: "Settings", icon: <SettingsIcon />, route: "/settings" },
        ].map((item) => (

          <ListItem component={Link} to={item.route}key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
