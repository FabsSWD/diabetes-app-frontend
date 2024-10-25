import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      // First, check if the user exists
      const userExistsResponse = await axios.get('http://localhost:8085/user/exists', {
        params: {
          username: username,
        },
      });

      if (!userExistsResponse.data) {
        setError('User does not exist');
        return;
      }

      // If user exists, validate the password
      const response = await axios.post('http://localhost:8085/user/validate', null, {
        params: {
          username: username,
          password: password,
        },
      });

      if (response.data === true) {
        // Redirect or indicate successful login
        alert('Login successful');
      } else {
        setError('Invalid password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
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
            label="Password"
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
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}