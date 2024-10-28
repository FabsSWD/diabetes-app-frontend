import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';
import './index.css';
import { UserProvider } from './context/UserContext';
import { BrowserRouter } from 'react-router-dom'; // Asegúrate de importar BrowserRouter

const theme = createTheme({
  palette: {
    primary: {
      main: '#a8d5ba',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8bbca1',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8f9fa',
      paper: '#e8f0ed',
    },
    text: {
      primary: '#37474f',
    },
  },
  typography: {
    fontFamily: '"Nunito", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    fontSize: 14,
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#37474f',
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
  <UserProvider>
    <BrowserRouter> {/* Envuelve App en BrowserRouter */}
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </UserProvider>,
  document.getElementById('root')
);
