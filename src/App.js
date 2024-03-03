// In App.js
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LandingPage from './components/LandingPage';
import LoginSignUpPage from './components/LoginSignUpPage';
import PricingPage from './components/PricingPage';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/login" element={<LoginSignUpPage />} />
          <Route path="/app" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} /> 
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
