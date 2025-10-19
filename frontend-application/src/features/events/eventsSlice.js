import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attendees: [],
  chartType: "pie",
  projectName: "",
  projectDescription: "",
  projectOrganizer: "",
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
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
  },
});

export const {
  addAttendee,
  deleteAttendee,
  importAttendees,
  changeChartType,
  updateField,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
