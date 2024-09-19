import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Avatar } from '@mui/material';

const recentPatients = [
  { name: 'Dawson Lane', visitId: 'OPD-2345', date: '5/7/21', gender: 'Male', disease: 'Diabetes', status: 'Out-Patient' },
  { name: 'Albert Flores', visitId: 'IPD-2424', date: '5/7/21', gender: 'Male', disease: 'Diabetes', status: 'Out-Patient' },
  { name: 'Ella Lucia', visitId: 'OPD-2345', date: '5/15/21', gender: 'Female', disease: 'Diabetes', status: 'Out-Patient' },
  { name: 'Albert Flores', visitId: 'IPD-2424', date: '5/30/21', gender: 'Male', disease: 'Diabetes', status: 'Out-Patient' },
];

const RecentPatients: React.FC = () => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Recent Patients
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Patient Name</TableCell>
              <TableCell>Visit Id</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Disease</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentPatients.map((patient, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={`https://i.pravatar.cc/150?img=${index + 20}`} sx={{ marginRight: 2 }} />
                    {patient.name}
                  </div>
                </TableCell>
                <TableCell>{patient.visitId}</TableCell>
                <TableCell>{patient.date}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.disease}</TableCell>
                <TableCell>{patient.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RecentPatients;