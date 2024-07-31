// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Menu, Search, Apps, Brightness2, Brightness7 } from '@mui/icons-material';
import { useTheme as useAppTheme } from '../contexts/ThemeContext';
import { logout } from '../redux/authSlice';

const Header = ({ onMenuClick, onAppsClick }) => {
  const { darkMode, setDarkMode } = useAppTheme();
  const dispatch = useDispatch();

  const handleToggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="sticky" color="default" elevation={0}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick}>
          <Menu />
        </IconButton>
        <Box display="flex" alignItems="center" ml={2}>
          <img src="logo.png" alt="Logo" style={{ height: '40px', marginRight: '8px' }} />
        </Box>
        <Box flexGrow={1} />
        <IconButton color="inherit">
          <Search />
        </IconButton>
        <IconButton color="inherit" onClick={onAppsClick}>
          <Apps />
        </IconButton>
        <IconButton color="inherit" onClick={handleToggleDarkMode}>
          {darkMode ? <Brightness7 /> : <Brightness2 />}
        </IconButton>
        <IconButton color="inherit" onClick={handleLogout}>
          Logout
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
