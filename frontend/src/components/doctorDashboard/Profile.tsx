import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Rating,
  Tab,
  Tabs,
  Typography,
  Button,
} from '@mui/material';
import { styled } from '@mui/system';

interface Review {
  id: number;
  name: string;
  avatar: string;
  occupation: string;
  rating: number;
  date: string;
  comment: string;
}

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(20),
  height: theme.spacing(20),
  margin: 'auto',
}));

const StyledRating = styled(Rating)({
  fontSize: '1.5rem',
});

const reviews: Review[] = [
  {
    id: 1,
    name: 'Ronald Richards',
    avatar: '/path/to/avatar1.jpg',
    occupation: 'Founder',
    rating: 5,
    date: '8 Jun, 2021',
    comment: 'Thank you to Dr. Stephen Conley and staff for a great experience right from the start. Everyone made me feel comfortable and the outcome was great. If you need heart surgery check out Dr. Stephen.',
  },
  {
    id: 2,
    name: 'Annette Black',
    avatar: '/path/to/avatar2.jpg',
    occupation: 'Teacher',
    rating: 5,
    date: '8 Jun, 2021',
    comment: 'Dr. Stephen did a great job on my knee! After my injection I was able to walk again without pain. Before this injection I had 24 hour round the clock pain. Now, I can walk without any discomfort. Thank You Dr. Stephen Conley',
  },
  {
    id: 3,
    name: 'Angelina Jully',
    avatar: '/path/to/avatar3.jpg',
    occupation: 'Teacher',
    rating: 5,
    date: '8 Jun, 2021',
    comment: 'Excellent cardiologist, my husband and I have both had surgery and ongoing care from him over the years, the medical technology used is state of the art as well, continue to highly recommend.',
  },
  {
    id: 4,
    name: 'Jane Cooper',
    avatar: '/path/to/avatar4.jpg',
    occupation: 'Teacher',
    rating: 5,
    date: '8 Jun, 2021',
    comment: 'Excellent cardiologist, my husband and I have both had surgery and ongoing care from him over the years, the medical technology used is state of the art as well, continue to highly recommend.',
  },
];

const DoctorProfile: React.FC = () => {
  const [tabValue, setTabValue] = React.useState(3);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <ProfileAvatar alt="Dr. Stephen Conley" src="/path/to/doctor-avatar.jpg" />
              <Typography variant="h5" align="center" gutterBottom>
                Dr. Stephen Conley
              </Typography>
              <Typography variant="subtitle1" align="center" color="textSecondary">
                Cardiologist
              </Typography>
              <Box display="flex" justifyContent="center" my={2}>
                <Button variant="contained" color="primary">
                  Edit Profile
                </Button>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Typography variant="h6" component="span">
                  146 Rates
                </Typography>
                <StyledRating value={5} readOnly />
              </Box>
              <Box mt={2}>
                <Typography variant="subtitle1">Trust</Typography>
                <Box width="100%" bgcolor="#e0e0e0" height={8} borderRadius={4}>
                  <Box width="95%" bgcolor="#4caf50" height={8} borderRadius={4} />
                </Box>
                <Typography variant="body2" align="right">
                  95%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box mb={2}>
            <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
              <Tab label="My Profile" />
              <Tab label="Change Password" />
              <Tab label="Notification" />
              <Tab label="Reviews" />
            </Tabs>
          </Box>
          {tabValue === 3 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Reviews
              </Typography>
              {reviews.map((review) => (
                <Card key={review.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Avatar alt={review.name} src={review.avatar} />
                      </Grid>
                      <Grid item xs>
                        <Typography variant="subtitle1">{review.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {review.occupation}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Rating value={review.rating} readOnly size="small" />
                        <Typography variant="caption" display="block" align="right">
                          {review.date}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography variant="body2" paragraph sx={{ mt: 2 }}>
                      {review.comment}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default DoctorProfile;