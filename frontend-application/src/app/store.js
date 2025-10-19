import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/tasksSlice";
import eventsReducer from "../features/events/eventsSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    events: eventsReducer,
  },
});
