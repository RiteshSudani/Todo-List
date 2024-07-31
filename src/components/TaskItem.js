// src/components/TaskItem.js
import React, { useState } from "react";
import { Box, ListItem, ListItemText, IconButton, useTheme } from "@mui/material";
import { Star, StarOutline } from "@mui/icons-material";

const TaskItem = ({ task, initialCompleted }) => {
  const theme = useTheme();
  const [completed, setCompleted] = useState(initialCompleted);

  const toggleCompletion = () => {
    setCompleted(!completed);
  };

  return (
    <ListItem sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 1, mb: 1 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
        <ListItemText
          primary={task}
          sx={{
            textDecoration: completed ? "line-through" : "none",
            color: theme.palette.text.primary,
          }}
        />
        <IconButton onClick={toggleCompletion}>
          {completed ? (
            <Star sx={{ color: theme.palette.secondary.main }} />
          ) : (
            <StarOutline sx={{ color: theme.palette.primary.main }} />
          )}
        </IconButton>
      </Box>
    </ListItem>
  );
};

export default TaskItem;
