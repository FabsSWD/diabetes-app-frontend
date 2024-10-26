// src/components/LandingPage.js
import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/explore'); // Ajusta la ruta para el contenido principal de la app
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa',
        padding: '2rem',
      }}
    >
      <Typography variant="h3" sx={{ mb: 2 }}>
        Bienvenido a Diabetes App
      </Typography>
      <Typography variant="h6" sx={{ mb: 4 }}>
        ¡Gracias por iniciar sesión! Explore nuestras funciones para gestionar mejor su salud.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleExploreClick}>
        Explorar Funciones
      </Button>
    </Box>
  );
};

export default LandingPage;
