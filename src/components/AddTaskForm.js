// src/components/AddTaskForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, TextField, Button } from "@mui/material";
import { addTask } from "../redux/taskSlice";

const AddTaskForm = ({ onClose }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      dispatch(addTask(taskTitle));
      setTaskTitle("");
      onClose(); 
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="New Task"
        variant="outlined"
        fullWidth
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Add Task
      </Button>
    </Box>
  );
};

export default AddTaskForm;
