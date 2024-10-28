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
import { useTranslation } from 'react-i18next';
import esFlag from '../assets/es-flag.png';
import usFlag from '../assets/us-flag.png';

export default function Appbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);
  const { t, i18n } = useTranslation();
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
    navigate('/userprofile');
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
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
            {t('appbar.title')}
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
                    {t('appbar.makePrediction')}
                  </Button>
                  <Button onClick={() => navigate('/predictions')}>
                    {t('appbar.predictionTable')}
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
            {t('appbar.title')}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {user && (
              <>
                <Button
                  onClick={() => navigate('/predict')}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {t('appbar.makePrediction')}
                </Button>
                <Button
                  onClick={() => navigate('/predictions')}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {t('appbar.predictionTable')}
                </Button>
              </>
            )}
          </Box>

          {!user ? (
            <Button color="inherit" onClick={handleLoginClick}>
              {t('appbar.login')}
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLogoutClick}>
              {t('appbar.logout')}
            </Button>
          )}

          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', ml: 2 }}>
            <Tooltip title={t('appbar.userProfile')}>
              <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <IconButton onClick={toggleLanguage} sx={{ ml: 2 }}>
              <img
                src={i18n.language === 'en' ? usFlag : esFlag}
                alt="flag"
                style={{ width: '24px', height: '24px' }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
