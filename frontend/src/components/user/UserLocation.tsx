import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setLocation, setLoading, setError } from '../../features/UserLocationSlice';
import LocationSearch from './LocationSearch';

const UserLocation: React.FC = () => {
  const dispatch = useDispatch();
  const { latitude, longitude, loading, error } = useSelector((state: RootState) => state.userLocation);

  useEffect(() => {
    console.log("UserLocation component mounted");
    if (!navigator.geolocation) {
      dispatch(setError("Geolocation is not supported by your browser"));
      return;
    }
  
    dispatch(setLoading(true));
    console.log("Requesting geolocation...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Geolocation success:", position);
        const { latitude, longitude } = position.coords;
        dispatch(setLocation({ latitude, longitude }));
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      },
      (error) => {
        console.error("Error getting location:", error);
        dispatch(setError(error.message));
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }, [dispatch]);

  console.log("Rendering UserLocation component", { latitude, longitude });

  if (loading) return <p>Loading location...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Your Location</h2>
      {latitude && longitude ? (
        <>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
        </>
      ) : (
        <p>Unable to retrieve location</p>
      )}
      <h2>Search Location</h2>
      <LocationSearch />
    </div>
  );
};
export default UserLocation