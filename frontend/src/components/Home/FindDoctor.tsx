import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, TextField, Switch, Button, FormControlLabel, Typography, Paper } from '@mui/material';
import { AppDispatch, RootState } from '../../store/store';
import { setName, setSpeciality, setAvailable, setNearMe, setPerimeter } from '../../features/HomeSlices/findDoctorSlice';
import { searchDoctors } from '../../features/HomeSlices/doctorsSlice';
import SearchResults from './SearchResults';
import LocationSearch, { SearchResult } from '../user/LocationSearch';
import { setSearchedLocation, clearSearchedLocation } from '../../features/UserLocationSlice';


interface FindDoctorProps {
  onToggleReference: () => void;
}

const FindDoctor: React.FC<FindDoctorProps> = ({ onToggleReference }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { name, speciality, available, nearMe, perimeter } = useSelector((state: RootState) => state.findDoctor);
  const [localPerimeter, setLocalPerimeter] = useState(perimeter.toString());
  const [hasSearched, setHasSearched] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<SearchResult | null>(null);

  const handleSearch = () => {
    dispatch(searchDoctors({
      name,
      speciality,
      available,
      nearMe,
      perimeter: nearMe ? 20 : (localPerimeter === '' ? null : parseInt(localPerimeter) || null),
      latitude: selectedLocation?.lat ? parseFloat(selectedLocation.lat) : undefined,
      longitude: selectedLocation?.lon ? parseFloat(selectedLocation.lon) : undefined,
    }));
    if (selectedLocation) {
      dispatch(setSearchedLocation({
        latitude: parseFloat(selectedLocation.lat),
        longitude: parseFloat(selectedLocation.lon)
      }));
    }
    setHasSearched(true);
    setShowResults(true);
    setSelectedLocation(null);
  };

  const handleNearMeToggle = (checked: boolean) => {
    dispatch(setNearMe(checked));
    if (checked) {
      dispatch(setPerimeter(20));
      setLocalPerimeter('20');
      setSelectedLocation(null);
    }
  };

  const handleHideResults = () => {
    setShowResults(false);
    dispatch(clearSearchedLocation());
  };

  const handleLocationSelect = (result: SearchResult) => {
    setSelectedLocation(result);
  };

  return (
    <>
      <Paper elevation={3} sx={{ mt: -5, borderRadius: 4, overflow: 'hidden', mb: 4 }}>
        <Box p={2}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Find a Doctor
          </Typography>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => dispatch(setName(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Speciality"
                variant="outlined"
                value={speciality}
                onChange={(e) => dispatch(setSpeciality(e.target.value))}
              />
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <FormControlLabel
                control={
                  <Switch
                    size="small"
                    checked={available}
                    onChange={(e) => dispatch(setAvailable(e.target.checked))}
                  />
                }
                label="Available"
              />
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <FormControlLabel
                control={
                  <Switch
                    size="small"
                    checked={nearMe}
                    onChange={(e) => handleNearMeToggle(e.target.checked)}
                  />
                }
                label="Near Me"
              />
            </Grid>
            {!nearMe && (
              <>
                <Grid item xs={12} sm={6} md={4}>
                  <LocationSearch onSelectLocation={handleLocationSelect} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Perimeter (km)"
                    variant="outlined"
                    type="number"
                    value={localPerimeter}
                    onChange={(e) => setLocalPerimeter(e.target.value)}
                    onBlur={() => dispatch(setPerimeter(parseInt(localPerimeter) || 15))}
                  />
                </Grid>
              </>
            )}




            
<Grid item xs={12} sm={6} md={2}>
              <Box display="flex" justifyContent="space-between">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ height: '36px', borderRadius: 2, mr: 1 }}
                  onClick={handleSearch}
                >
                  Search
                </Button>
                <Button
  variant="contained"
  color="error"
  size="small"
  onClick={onToggleReference}
  sx={{ height: '36px', borderRadius: 2, minWidth: '80px', px: 1 }}
>
  Refrence
</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      {hasSearched && showResults && (
        <>
          <SearchResults />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button variant="outlined" onClick={handleHideResults}>
              Hide Results
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default FindDoctor;