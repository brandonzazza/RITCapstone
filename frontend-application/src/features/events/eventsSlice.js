import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attendees: [],
  chartType: "pie",
};

const dashboardSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addAttendee: (state, action) => {
      state.attendees.push(action.payload);
    },
    deleteAttendee: (state, action) => {
      state.attendees = state.attendees.filter(
        (a) => a.email !== action.payload
      );
    },
    importAttendees: (state, action) => {
      state.attendees.push(...action.payload);
    },
    changeChartType: (state, action) => {
      state.chartType = action.payload;
    },
  },
});

export const { addAttendee, deleteAttendee, importAttendees, changeChartType } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
