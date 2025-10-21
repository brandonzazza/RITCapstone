import React from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  addAttendee,
  deleteAttendee,
  importAttendees,
  changeChartType,
  updateField,
} from "../../features/events/eventsSlice";

const ProjectForm = (props) => {
  const dispatch = useDispatch();

  const { projectName, projectDescription, projectOrganizer } = useSelector(
    (state) => state.events
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ field: name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add update push to database here
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        {props.Title}
      </Typography>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 500 }}>
        <TextField
          label="Project Name"
          name="projectName"
          fullWidth
          margin="normal"
          value={projectName}
          onChange={handleChange}
        />
        <TextField
          label="Project Description"
          name="projectDescription"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={projectDescription}
          onChange={handleChange}
        />
        <TextField
          label="Organizer"
          name="projectOrganizer"
          fullWidth
          margin="normal"
          value={projectOrganizer}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Save
        </Button>
      </form>
    </Box>
  );
};

export default ProjectForm;
