import React from 'react';
import { Card, CardContent, Typography, CardMedia, Button } from '@mui/material';

interface DoctorProps {
  name: string;
  specialty: string;
  imageUrl: string;
}

const DoctorCard: React.FC<DoctorProps> = ({ name, specialty, imageUrl }) => {
  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {specialty}
        </Typography>
      </CardContent>
      <Button size="small" color="primary">Book Appointment</Button>
    </Card>
  );
};

export default DoctorCard;