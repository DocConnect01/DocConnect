import React from "react";
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const recentPatients = [
  {
    name: "Deveon Lane",
    visitId: "OPD-2345",
    date: "5/7/21",
    gender: "Male",
    disease: "Diabetes",
    status: "Out-Patient",
  },
  {
    name: "Albert Flores",
    visitId: "IPD-2424",
    date: "5/24/21",
    gender: "Male",
    disease: "Diabetes",
    status: "In-Patient",
  },
  {
    name: "Ella Lucia",
    visitId: "OPD-2345",
    date: "8/15/21",
    gender: "Female",
    disease: "Diabetes",
    status: "Out-Patient",
  },
  // Add more entries...
];

const RecentPatients: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Recent Patients</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient Name</TableCell>
              <TableCell>Visit Id</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Diseases</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentPatients.map((patient, index) => (
              <TableRow key={index}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.visitId}</TableCell>
                <TableCell>{patient.date}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.disease}</TableCell>
                <TableCell>{patient.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentPatients;