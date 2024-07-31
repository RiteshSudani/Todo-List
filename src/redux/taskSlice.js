  // src/redux/taskSlice.js
  import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

  // Define the initial state
  const initialState = {
    items: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  };

  // Create an async thunk for fetching tasks
  export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  });

  const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
      addTask: (state, action) => {
        const newTask = {
          id: state.items.length + 1,
          title: action.payload,
          completed: false,
        };
        state.items.push(newTask);
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchTasks.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.items = action.payload.slice(0, 5);
        })
        .addCase(fetchTasks.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        });
    },
  });

  export const { addTask } = tasksSlice.actions;
  export default tasksSlice.reducer;

  // Selectors
  export const selectAllTasks = (state) => state.tasks.items;
