// src/components/TaskList.js
import React, { useEffect, useState } from "react";
import { Box, Typography, List, Stack, Button, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, selectAllTasks } from "../redux/taskSlice";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AutorenewSharpIcon from "@mui/icons-material/AutorenewSharp";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TaskItem from "./TaskItem";
import AddTaskForm from "./AddTaskForm";

const TaskList = ({ title, completed = false }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const tasks = useSelector(selectAllTasks); // Get tasks from Redux
  const taskStatus = useSelector((state) => state.tasks.status);
  const error = useSelector((state) => state.tasks.error);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (taskStatus === "idle") {
      dispatch(fetchTasks());
    }
  }, [taskStatus, dispatch]);

  useEffect(() => {
    if (taskStatus === "succeeded") {
      console.log("Tasks successfully fetched and saved in Redux store:", tasks);
    }
  }, [taskStatus, tasks]);

  let content;
  if (taskStatus === "loading") {
    content = <div>Loading...</div>;
  } else if (taskStatus === "succeeded") {
    content = (
      <List>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task.title} initialCompleted={task.completed} />
        ))}
      </List>
    );
  } else if (taskStatus === "failed") {
    content = <div>Error: {error}</div>;
  }

  return (
    <Box mt={3}>
      <Typography variant="h6" color="text.primary">
        {title}
      </Typography>

      {!completed && (
        <Stack
          spacing={2}
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
          height="15vh"
          sx={{
            padding: 2,
            borderRadius: 1,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Box spacing={5} display="flex" alignItems="flex-end">
            <NotificationsNoneIcon />
            <AutorenewSharpIcon />
            <CalendarMonthIcon />
          </Box>
          <Button
            onClick={() => setShowForm(!showForm)}
            style={{
              color: "white",
              backgroundColor: theme.palette.primary.main,
              height: "35px",
              margin: "0px 20px",
            }}
            variant="contained"
            size="small"
          >
            {showForm ? "Cancel" : "Add New"}
          </Button>
        </Stack>
      )}

      {showForm && <AddTaskForm onClose={() => setShowForm(false)} />}

      {content}
    </Box>
  );
};

export default TaskList;
