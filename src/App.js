// src/App.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Box, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import { ThemeProviderWrapper } from './contexts/ThemeContext';
import Sidebar2 from './components/Sidebar2';
import { fetchTasks, selectAllTasks } from './redux/taskSlice';
import LoginSignup from './components/LoginSignup';
import { selectIsAuthenticated } from './redux/authSlice';

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectAllTasks);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Open sidebar by default
  const [appsSidebarOpen, setAppsSidebarOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0); // Track the selected menu index

  useEffect(() => {
    // Fetch tasks when the component mounts if authenticated
    if (isAuthenticated) {
      dispatch(fetchTasks());
    }
  }, [dispatch, isAuthenticated]);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const toggleAppsSidebar = () => {
    setAppsSidebarOpen((prev) => !prev);
  };

  // Handle menu item clicks and set the selected index
  const handleMenuItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <ThemeProviderWrapper>
      <Container maxWidth="xl" disableGutters>
        {!isAuthenticated ? (
          // Render LoginSignup component when not authenticated
          <LoginSignup />
        ) : (
          // Render the Dashboard components when authenticated
          <>
            <Header onMenuClick={toggleSidebar} onAppsClick={toggleAppsSidebar} />
            <Grid container spacing={2}>
              {/* Conditionally render Sidebar */}
              {sidebarOpen && (
                <Grid item xs={12} md={3} lg={2}>
                  <Sidebar onMenuItemClick={handleMenuItemClick} />
                </Grid>
              )}
              <Grid
                item
                xs={12}
                md={sidebarOpen ? (appsSidebarOpen ? 9 : 9) : 12}
                lg={sidebarOpen ? (appsSidebarOpen ? 8 : 10) : 12}
              >
                <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">
                    To Do <ArrowDropDownIcon />
                  </Typography>
                </Box>
                
                {selectedIndex === 0 && ( // Only display tasks if "All Tasks" is selected
                  <TaskList
                    title="All Tasks"
                    tasks={tasks.map((task) => task.title)}
                  />
                )}
              </Grid>
              {appsSidebarOpen && (
                <Grid
                  item
                  xs={12}
                  md={3}
                  lg={2}
                  style={{ position: 'fixed', right: 0, top: 64, bottom: 0, backgroundColor: '#f4f4f4', padding: '10px' }}
                >
                  <Sidebar2 />
                </Grid>
              )}
            </Grid>
          </>
        )}
      </Container>
    </ThemeProviderWrapper>
  );
}

export default App;
