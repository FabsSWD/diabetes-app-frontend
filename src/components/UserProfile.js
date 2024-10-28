import React, { useContext } from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const UserProfile = () => {
  const { t } = useTranslation(); // Importación de traducción
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
          <Typography variant="h5">{t('userProfile.notLoggedIn')}</Typography>
          <Button variant="contained" onClick={() => navigate('/login')} sx={{ mt: 2 }}>
            {t('userProfile.loginPrompt')}
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4">{t('userProfile.title')}</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          {t('userProfile.username')}: {user.username}
        </Typography>
        <Button variant="contained" onClick={handleLogout} sx={{ mt: 3 }}>
          {t('userProfile.logoutButton')}
        </Button>
      </Box>
    </Container>
  );
};

export default UserProfile;
