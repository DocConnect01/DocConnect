import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, TextField, Switch, Button, FormControlLabel, Typography, Paper } from '@mui/material';
import { RootState } from '../../store/store';
import { setName, setSpeciality, setAvailable } from '../../features/findDoctorSlice';

const FindDoctor: React.FC = () => {
  const dispatch = useDispatch();
  const { name, speciality, available } = useSelector((state: RootState) => state.findDoctor);

  return (
    <Paper elevation={3} sx={{ mt: -5, borderRadius: 4, overflow: 'hidden' }}>
      <Box p={4}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Find a Doctor
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => dispatch(setName(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Speciality"
              variant="outlined"
              value={speciality}
              onChange={(e) => dispatch(setSpeciality(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControlLabel
              control={
                <Switch
                  checked={available}
                  onChange={(e) => dispatch(setAvailable(e.target.checked))}
                />
              }
              label="Available"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button variant="contained" color="primary" fullWidth sx={{ height: '100%', borderRadius: 2 }}>
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default FindDoctor;