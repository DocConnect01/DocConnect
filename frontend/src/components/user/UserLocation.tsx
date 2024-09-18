import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserLocation } from '../../features/userLocationSlice';
import { AppDispatch, RootState } from '../../store/store';

const UserLocation: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { latitude, longitude, placeName, loading, error } = useSelector((state: RootState) => state.userLocation);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(updateUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }));
      },
      (error) => {
        console.error("Error getting location:", error.message);
      }
    );
  }, [dispatch]);

  if (loading) return <div>Loading location...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Your Location</h2>
      {latitude && longitude && (
        <>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
          {placeName && <p>Place: {placeName}</p>}
        </>
      )}
    </div>
  );
};

export default UserLocation;