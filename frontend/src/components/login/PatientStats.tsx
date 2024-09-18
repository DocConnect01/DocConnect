import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const PatientStats: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Patients</Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h5">24.4k</Typography>
            <Typography variant="body2">New Patients</Typography>
          </Box>
          <Box>
            <Typography variant="h5">166.3k</Typography>
            <Typography variant="body2">Old Patients</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PatientStats;