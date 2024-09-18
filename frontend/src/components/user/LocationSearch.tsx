import React, { useState, useEffect } from 'react';
import { TextField, List, ListItem, ListItemText, Button } from '@mui/material';
import debounce from 'lodash/debounce';

interface SearchResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

const LocationSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<SearchResult | null>(null);

  const searchLocation = async (input: string) => {
    if (input.length < 3) return;
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error searching for location:', error);
    }
  };


  

  const debouncedSearch = debounce(searchLocation, 300);

  useEffect(() => {
    debouncedSearch(query);
    return () => {
      debouncedSearch.cancel();
    };
  }, [query]);

  const handleSelectLocation = (result: SearchResult) => {
    setSelectedLocation(result);
    setQuery(result.display_name);
    setResults([]);
  };

  const handleShowCoordinates = async () => {
    if (selectedLocation) {
      console.log(`Selected location: ${selectedLocation.display_name}`);
      console.log(`Latitude: ${selectedLocation.lat}, Longitude: ${selectedLocation.lon}`);
      alert(`Latitude: ${selectedLocation.lat}, Longitude: ${selectedLocation.lon}`);
  
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${selectedLocation.lat}&lon=${selectedLocation.lon}&format=json`);
        const data = await response.json();
        console.log('Reverse geocoding result:', data);
      } catch (error) {
        console.error('Error fetching reverse geocoding data:', error);
      }
    }
  };

  return (
    <div>
      <TextField
        fullWidth
        label="Search location"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        margin="normal"
      />
      <List>
        {results.map((result) => (
          <ListItem key={result.place_id} onClick={() => handleSelectLocation(result)} sx={{ cursor: 'pointer' }}>
            <ListItemText primary={result.display_name} />
          </ListItem>
        ))}
      </List>
      {selectedLocation && (
        <Button variant="contained" color="primary" onClick={handleShowCoordinates}>
          Show Coordinates
        </Button>
      )}
    </div>
  );
};

export default LocationSearch;