import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setLocation, setLoading, setError } from '../../features/UserLocationSlice';
import axios from 'axios';

const UserLocation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const dispatch = useDispatch();
  const { latitude, longitude, loading, error } = useSelector((state: RootState) => state.userLocation);
  const updateAttempted = useRef(false);

  useEffect(() => {
    const updateUserLocation = async () => {
      if (updateAttempted.current) return;
      updateAttempted.current = true;

      console.log('Starting location update process');
      dispatch(setLoading(true));
      const token = localStorage.getItem('token');

      if (!token) {
        console.log('No authentication token found');
        dispatch(setError('No authentication token found'));
        return;
      }

      if (!navigator.geolocation) {
        console.log('Geolocation is not supported by your browser');
        dispatch(setError('Geolocation is not supported by your browser'));
        return;
      }

      console.log('Requesting user location');
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Location obtained: Lat ${latitude}, Lon ${longitude}`);
          dispatch(setLocation({ latitude, longitude }));

          try {
            console.log('Sending location update to server');
            const response = await axios.put(
              'http://localhost:5000/api/users2/update-location',
              { latitude, longitude },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            console.log('Location update successful:', response.data);
            onComplete();
          } catch (error) {
            console.error('Error updating location:', error);
            dispatch(setError('Failed to update location on server'));
          } finally {
            dispatch(setLoading(false));
            console.log('Location update process completed');
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          dispatch(setError(error.message));
          dispatch(setLoading(false));
          onComplete();
        }
      );
    };

    updateUserLocation();
  }, [dispatch, onComplete]);

  return null;
};

export default UserLocation;