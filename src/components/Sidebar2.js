// src/components/Sidebar2.js
import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider, Typography, useTheme } from '@mui/material';
import { ShoppingCart, Add, Alarm, CalendarToday, Repeat, NoteAdd } from '@mui/icons-material';

const Sidebar2 = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: 250,
        backgroundColor: theme.palette.background.paper,
        padding: '10px',
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Typography variant="h6" color="text.primary" mb={2}>
        Options
      </Typography>
      <List>
        <ListItem button>
          <ListItemIcon>
            <ShoppingCart sx={{ color: theme.palette.text.primary }} />
          </ListItemIcon>
          <ListItemText primary="Buy groceries" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Add sx={{ color: theme.palette.text.primary }} />
          </ListItemIcon>
          <ListItemText primary="Add Step" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Alarm sx={{ color: theme.palette.text.primary }} />
          </ListItemIcon>
          <ListItemText primary="Set Reminder" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <CalendarToday sx={{ color: theme.palette.text.primary }} />
          </ListItemIcon>
          <ListItemText primary="Add Due Date" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Repeat sx={{ color: theme.palette.text.primary }} />
          </ListItemIcon>
          <ListItemText primary="Repeat" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <NoteAdd sx={{ color: theme.palette.text.primary }} />
          </ListItemIcon>
          <ListItemText primary="Add Notes" />
        </ListItem>
      </List>
      <Divider sx={{ my: 2 }} />
      <Box mt={2}>
        <IconButton sx={{ color: theme.palette.primary.main }}>
          {/* Add your icon here */}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Sidebar2;
