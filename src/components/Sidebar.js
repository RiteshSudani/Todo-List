// src/components/Sidebar.js
import React, { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
  useTheme,
} from "@mui/material";
import {
  List as ListIcon,
  CalendarToday,
  Star,
  CalendarViewDay,
  Person,
} from "@mui/icons-material";

const Sidebar = ({ onMenuItemClick }) => {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const menuItems = [
    { icon: <ListIcon />, text: "All Tasks" },
    { icon: <CalendarToday />, text: "Today" },
    { icon: <Star />, text: "Important" },
    { icon: <CalendarViewDay />, text: "Planned" },
    { icon: <Person />, text: "Assigned to me" },
  ];

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    onMenuItemClick(index); // Notify parent component about the selected index
  };

  return (
    <Box
      bgcolor="background.paper"
      height="100vh"
      p={2}
      sx={{ backgroundColor: theme.palette.background.paper }}
    >
      <Box textAlign="center" mb={3}>
        <Avatar
          src="profile.png"
          alt="Profile"
          sx={{ width: 56, height: 56, mx: "auto" }}
        />
        <Typography variant="h6" color="text.primary">
          Hey, ABCD
        </Typography>
      </Box>
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            selected={selectedIndex === index}
            onClick={() => handleListItemClick(index)}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(53, 121, 55, 0.16)",
              },
              "&.Mui-selected": {
                backgroundColor: "rgba(53, 121, 55, 0.32)",
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Box mt={3}>
        <Button variant="outlined" sx={{ color: theme.palette.text.primary }} fullWidth>
          + Add list
        </Button>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box>
        <Typography variant="subtitle1" color="text.primary">
          Today Tasks
        </Typography>
        <Box ml={2}>
          <Typography variant="body2" color="text.secondary">
            11 tasks
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1}>
          <div
            style={{
              height: "200px",
              width: "300px",
              borderTop: `30px solid ${theme.palette.primary.main}`,
              borderRight: `30px solid ${theme.palette.primary.main}`,
              borderLeft: `30px solid ${theme.palette.primary.main}`,
              borderBottom: `30px solid ${theme.palette.secondary.main}`,
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <Typography variant="body2" color="white">
              70%
            </Typography> */}
          </div>
        </Box>
        <Box mt={2} display="flex" alignItems="center">
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: theme.palette.primary.main,
              marginRight: 1,
            }}
          />
          <Typography variant="body2" sx={{ marginRight: 2 }} color="text.secondary">
            Pending
          </Typography>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: theme.palette.secondary.main,
              marginRight: 1,
            }}
          />
          <Typography variant="body2" color="text.secondary">
            Done
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
