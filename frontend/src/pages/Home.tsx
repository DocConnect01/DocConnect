export {}

// // Dashboard.tsx
// import React from "react";
// import {
//   Container,
//   Grid,
//   Paper,
//   Typography,
//   Avatar,
//   Box,
//   Button,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
// } from "@mui/material";
// import { PieChart } from "@mui/icons-material";

// const dummyPatients = [
//   {
//     name: "Bogdan Krivenchenko",
//     age: 45,
//     gender: "Male",
//     date: "12 April 9:30 AM",
//     status: "Declined",
//   },
//   {
//     name: "Jenny Wilson",
//     age: 25,
//     gender: "Female",
//     date: "25 April 10:30 AM",
//     status: "Confirmed",
//   },
//   {
//     name: "Dianne Russel",
//     age: 45,
//     gender: "Female",
//     date: "Today 2:30 PM",
//     status: "Confirmed",
//   },
//   // Add more dummy patients
// ];

// const dummyAppointments = [
//   { name: "Jhon Smith", type: "Clinic Consulting", status: "Ongoing" },
//   { name: "Frank Murray", type: "Video Consulting", status: "Upcoming" },
//   { name: "Ella Lucia", type: "Emergency", status: "Upcoming" },
//   // Add more dummy appointments
// ];

// const Dashboard: React.FC = () => {
//   return (
//     <Container maxWidth="lg">
//       <Box mb={4}>
//         <Typography variant="h4">Welcome, Dr. Stephen</Typography>
//         <Typography variant="subtitle1">Have a nice day at work!</Typography>
//       </Box>

//       <Grid container spacing={3}>
//         {/* Stats Cards */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
//             <Typography variant="h5">24.4k</Typography>
//             <Typography variant="body2">Appointments</Typography>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
//             <Typography variant="h5">166.3k</Typography>
//             <Typography variant="body2">Total Patients</Typography>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
//             <Typography variant="h5">53.5k</Typography>
//             <Typography variant="body2">Clinic Consulting</Typography>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
//             <Typography variant="h5">28.0k</Typography>
//             <Typography variant="body2">Video Consulting</Typography>
//           </Paper>
//         </Grid>

//         {/* Appointment Requests */}
//         <Grid item xs={12} md={8}>
//           <Paper elevation={3} sx={{ padding: 2 }}>
//             <Typography variant="h6">Appointment Requests</Typography>
//             <List>
//               {dummyPatients.map((patient, index) => (
//                 <ListItem key={index}>
//                   <ListItemAvatar>
//                     <Avatar>{patient.name[0]}</Avatar>
//                   </ListItemAvatar>
//                   <ListItemText
//                     primary={`${patient.name}, ${patient.gender}, ${patient.age} - ${patient.date}`}
//                     secondary={patient.status}
//                   />
//                   <Button
//                     variant="outlined"
//                     color={patient.status === "Confirmed" ? "success" : "error"}
//                   >
//                     {patient.status}
//                   </Button>
//                 </ListItem>
//               ))}
//             </List>
//           </Paper>
//         </Grid>

//         {/* Today's Appointments */}
//         <Grid item xs={12} md={4}>
//           <Paper elevation={3} sx={{ padding: 2 }}>
//             <Typography variant="h6">Today Appointments</Typography>
//             <List>
//               {dummyAppointments.map((appointment, index) => (
//                 <ListItem key={index}>
//                   <ListItemAvatar>
//                     <Avatar>{appointment.name[0]}</Avatar>
//                   </ListItemAvatar>
//                   <ListItemText
//                     primary={appointment.name}
//                     secondary={appointment.type}
//                   />
//                   <Button
//                     variant="outlined"
//                     color={
//                       appointment.status === "Ongoing" ? "primary" : "inherit"
//                     }
//                   >
//                     {appointment.status}
//                   </Button>
//                 </ListItem>
//               ))}
//             </List>
//           </Paper>
//         </Grid>
//       </Grid>

//       {/* Recent Patients */}
//       <Grid item xs={12} mt={4}>
//         <Paper elevation={3} sx={{ padding: 2 }}>
//           <Typography variant="h6">Recent Patients</Typography>
//           <List>
//             {dummyPatients.map((patient, index) => (
//               <ListItem key={index}>
//                 <ListItemText
//                   primary={`${patient.name} - ${patient.gender}`}
//                   secondary={`Visit ID: ${index + 1}`}
//                 />
//               </ListItem>
//             ))}
//           </List>
//         </Paper>
//       </Grid>
//     </Container>
//   );
// };

// export default Dashboard;
