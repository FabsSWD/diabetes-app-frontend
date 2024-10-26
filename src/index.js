import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';
import './index.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#a8d5ba', // Verde pastel para componentes principales
      contrastText: '#ffffff', // Texto blanco sobre el fondo verde
    },
    secondary: {
      main: '#8bbca1', // Verde más oscuro para componentes secundarios
      contrastText: '#ffffff', // Texto blanco sobre fondo secundario verde
    },
    background: {
      default: '#f8f9fa', // Fondo general en gris claro
      paper: '#e8f0ed', // Fondo para tarjetas y secciones en verde claro
    },
    text: {
      primary: '#37474f', // Texto en gris oscuro sobre fondos claros
    },
  },
  typography: {
    fontFamily: '"Nunito", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    fontSize: 14,
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#37474f', // Color para encabezados
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#37474f',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 300,
      color: '#37474f',
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
