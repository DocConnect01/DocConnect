import React from 'react';
import { Box, CssBaseline, Container } from '@mui/material';
import { styled } from '@mui/system';
import HeroSection from './HeroSection';
import AllServices from './AllServices';
import AllDoctors from './AllDoctors';
import AllTestimonials from './AllTestimonials';
import Statistics from './Statistics';
import SocialMedia from './SocialMedia';
import FindDoctor from './FindDoctor';

const GradientBackground = styled(Box)(({ theme }) => ({
  background: `
    linear-gradient(
      45deg,
      ${theme.palette.primary.light}11 0%,
      ${theme.palette.secondary.light}11 50%,
      ${theme.palette.primary.light}11 100%
    )
  `,
  backgroundSize: '400% 400%',
  animation: 'gradient 15s ease infinite',
  '@keyframes gradient': {
    '0%': {
      backgroundPosition: '0% 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
    '100%': {
      backgroundPosition: '0% 50%',
    },
  },
}));

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
}));

const FocusedSection = styled(Section)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10, 4),
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10, 8),
  },
}));

const Home: React.FC = () => {
  return (
    <GradientBackground>
      <CssBaseline />
      <HeroSection />
      <Section>
        <Statistics />
      </Section>
      <Container maxWidth="xl">

        <FocusedSection>
          <FindDoctor />
        </FocusedSection>
        <Section>
          <AllServices />
        </Section>
        <Section>
          <AllDoctors />
        </Section>
        <Section>
          <AllTestimonials />
        </Section>
      </Container>
      <SocialMedia />
    </GradientBackground>
  );
};

export default Home;