import * as React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AdbIcon from '@mui/icons-material/Adb';
import { UserContext } from '../context/UserContext';

export default function Appbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  const handleAvatarClick = () => {
    navigate('/userprofile'); // Redirects to UserProfile.js when avatar is clicked
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#a8d5ba' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Nunito',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Diabetes App
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {user && (
                <>
                  <Button onClick={() => navigate('/predict')}>
                    Realizar Predicción
                  </Button>
                  <Button onClick={() => navigate('/predictions')}>
                    Ver Predicciones
                  </Button>
                </>
              )}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Nunito',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Diabetes App
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {user && (
              <>
                <Button
                  onClick={() => navigate('/predict')}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Make Prediction
                </Button>
                <Button
                  onClick={() => navigate('/predictions')}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Prediction Table
                </Button>
              </>
            )}
          </Box>

          {!user ? (
            <Button color="inherit" onClick={handleLoginClick}>
              Login
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLogoutClick}>
              Logout
            </Button>
          )}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="User Profile">
              <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
