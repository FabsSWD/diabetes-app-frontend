// src/components/UserProfile.js
import React, { useContext } from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <Container component="main" maxWidth="xs">
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h5">User not logged in</Typography>
          <Button variant="contained" onClick={() => navigate('/login')} sx={{ mt: 2 }}>
            Go to Login
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4">User Profile</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Username: {user.username}
        </Typography>
        <Button variant="contained" onClick={handleLogout} sx={{ mt: 3 }}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default UserProfile;
