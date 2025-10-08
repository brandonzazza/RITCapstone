import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: {
    tasks: [{ id: "1", content: "Set up CI/CD" }],
    inProgress: [{ id: "2", content: "Implement auth" }],
    complete: [{ id: "3", content: "Design dashboard" }],
  },
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { column, task } = action.payload;
      state.tasks[column].push(task);
    },
    moveTask: (state, action) => {
      const { from, to, sourceIndex, destinationIndex } = action.payload;
      const [movedTask] = state.tasks[from].splice(sourceIndex, 1);
      state.tasks[to].splice(destinationIndex, 0, movedTask);
    },
    deleteTask: (state, action) => {
      const { column, taskId } = action.payload;
      state.tasks[column] = state.tasks[column].filter(
        (task) => task.id !== taskId
      );
    },
  },
});

export const { addTask, moveTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
