import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Avatar, CircularProgress } from '@mui/material';
import { RootState, AppDispatch } from "../../store/store";
import { fetchUsers } from "../../features/userSlice";

const RecentPatients: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

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
            {users.map((user, index) => (
              user.PatientAppointments.map((appointment: any) => (
                <TableRow key={appointment.AppointmentID}>
                  <TableCell component="th" scope="row">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar src={`https://i.pravatar.cc/150?img=${index + 20}`} sx={{ marginRight: 2 }} />
                      {`${user.FirstName} ${user.LastName}`}
                    </div>
                  </TableCell>
                  <TableCell>{appointment.AppointmentID}</TableCell>
                  <TableCell>{new Date(appointment.AppointmentDate).toLocaleDateString()}</TableCell>
                  <TableCell>{user.Gender}</TableCell>
                  <TableCell>{user.Disease}</TableCell>
                  <TableCell>{appointment.Status}</TableCell>
                </TableRow>
              ))
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RecentPatients;