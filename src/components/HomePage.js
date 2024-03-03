import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  VStack,
  Link,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Avatar
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const HomePage = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userDetails, setUserDetails] = useState({
    email: '',
    name: '',
    photoURL: ''
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (!user) {
        navigate('/login');
      } else {
        setUserDetails({
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL
        });
      }
    });

    return () => unsubscribe();
  }, [navigate, auth]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate('/'); // Redirect to root
    }).catch((error) => {
      // An error happened.
      console.error("Logout Error:", error);
    });
  };

  return (
    <Flex height="100vh">
      <Box w="200px" bg="blue.500" color="white" p={4}>
        <VStack align="stretch" spacing={4}>
          <Link href="#">Dashboard</Link>
          <Link href="#">Users</Link>
          <Link href="#">Settings</Link>
          <Flex align="center" justify="space-between" mb={4} onClick={onOpen} cursor="pointer">
            {/* Left Avatar */}
            <Avatar name={userDetails.name} src={userDetails.photoURL} size="sm" />
            <Text mx={2}>{userDetails.name}</Text>
        </Flex>
        </VStack>
      </Box>
      {/* Rest of the component remains unchanged */}

      {/* Modal for displaying user details */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Avatar name={userDetails.name} src={userDetails.photoURL} size="xl" />
              <Text>Name: {userDetails.name}</Text>
              <Text>Email: {userDetails.email}</Text>
            </VStack>
          </ModalBody>
            <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleLogout}>
                Logout
            </Button>
            <Button colorScheme="blue" onClick={onClose}>
                Close
            </Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default HomePage;
