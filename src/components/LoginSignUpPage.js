import React from 'react';
import { Box, Button, VStack, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';



const LoginSignUpPage = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const toast = useToast(); // Hook to show feedback

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // On successful Google sign-in
        navigate('/app'); // Redirect to /app
      })
      .catch((error) => {
        // Handle errors here
        toast({
          title: 'Error',
          description: "Failed to sign in with Google.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        console.error("Error during Google sign-in:", error);
      });
  };

  return (
    <Box p={10}>
      <VStack spacing={4} align="stretch">

        <Button colorScheme="blue" onClick={handleGoogleSignIn}>Login with Google</Button>
      </VStack>
    </Box>
  );
};

export default LoginSignUpPage;
