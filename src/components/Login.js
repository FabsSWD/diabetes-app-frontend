import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Typography, Container, Link } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const { t } = useTranslation(); // Importación de traducción
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8085/user/validate', {
        username: username,
        password: password,
      });

      if (response.data === true) {
        setError('');
        login({ username });
        navigate('/'); 
      } else {
        setError(t('login.errorInvalid'));
      }
    } catch (err) {
      setError(t('login.errorOccurred') + err);
    }
  };

  const handleRegister = () => {
    navigate('/register');
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
          {t('login.title')}
        </Typography>
        <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label={t('login.username')}
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
            name="password"
            label={t('login.password')}
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            {t('login.loginButton')}
          </Button>
          <Link href="/reset-password" variant="body2" sx={{ mb: 2 }}>
            {t('login.forgotPassword')}
          </Link>
          <Typography variant="body2" sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
            — {t('login.or')} —
          </Typography>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleRegister}
          >
            {t('login.registerPrompt')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
