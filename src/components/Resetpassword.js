import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export function ResetPassword() {
  const { t } = useTranslation(); // Importación de traducción
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError(t('resetPassword.errorMismatch'));
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8085/user/update-password`, null, {
        params: {
          username: username,
          newPassword: newPassword
        }
      });         

      if (response.data === true) {
        setSuccess(t('resetPassword.success'));
        setError('');
      } else {
        setError(t('resetPassword.errorOccurred'));
        setSuccess('');
      }
    } catch (err) {
      setError(t('resetPassword.errorOccurred') + err);
      setSuccess('');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          {t('resetPassword.title')}
        </Typography>
        <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label={t('resetPassword.username')}
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label={t('resetPassword.newPassword')}
            type="password"
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label={t('resetPassword.confirmPassword')}
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="primary" variant="body2">
              {success}
            </Typography>
          )}
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleResetPassword}
          >
            {t('resetPassword.resetButton')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
