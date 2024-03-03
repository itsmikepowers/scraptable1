// In components/LandingPage.js
import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <Box textAlign="center" p={10}>
      <h1>Welcome to Our SaaS App</h1>
      <Link to="/login">
        <Button colorScheme="blue" mt={4}>Login / Sign Up</Button>
      </Link>
    </Box>
  );
};

export default LandingPage;
