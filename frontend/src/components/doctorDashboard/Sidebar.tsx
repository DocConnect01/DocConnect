import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import PaymentIcon from '@mui/icons-material/Payment';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import ArticleIcon from '@mui/icons-material/Article'; // Blog icon
import PersonIcon from '@mui/icons-material/Person';   // My Patients icon
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#f8f8f8',
          padding: '16px',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', paddingBottom: '20px' }}>
        <img
          src="https://www.clipartmax.com/png/small/54-545682_doctor-logo-doctor-logo-png.png" // Replace with your logo URL
          alt="Doct Logo"
          style={{ width: '30px', marginRight: '10px' }}
        />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Doct.
        </Typography>
      </Box>

      {/* Menu Items */}
      <List>
        {[
          { text: 'Overview', icon: <DashboardIcon />, onClick: () => navigate('/dashboard') },
          { text: 'Appointment', icon: <EventIcon /> },
          { text: 'My Patients', icon: <PersonIcon /> },
          { text: 'Schedule Timings', icon: <EventIcon /> },
          { text: 'Payments', icon: <PaymentIcon /> },
          { text: 'Message', icon: <MessageIcon />, onClick: () => navigate('/chat') },
          { text: 'Blog', icon: <ArticleIcon /> },        // New Blog item
          { text: 'Settings', icon: <SettingsIcon />, onClick: () => navigate('/settings') },
        ].map((item, index) => (
          <ListItemButton
            key={item.text}
            sx={{
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '10px',
              '&:hover': {
                backgroundColor: '#000',  // Black background on hover
                color: '#fff',            // White text on hover
              },
              '&.Mui-selected': {
                backgroundColor: '#000',  // Black background for selected item
                color: '#fff',            // White text for selected item
              },
            }}
            onClick={item.onClick} 
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;