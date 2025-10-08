import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import tasksReducer from "../features/tasks/tasksSlice";
import eventsReducer from "../features/events/eventsSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    tasks: tasksReducer,
    events: eventsReducer,
  },
});
