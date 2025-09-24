import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers"; // requires @mui/x-date-pickers

function EventForm({ onSubmit }) {
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      eventName,
      location,
      date,
      time,
    };

    onSubmit(newEvent); // send event data up
    setEventName("");
    setLocation("");
    setDate(null);
    setTime(null);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, p: 3, boxShadow: 2, borderRadius: 2 }}
    >
      <Typography variant="h6" gutterBottom>
        Create New Event
      </Typography>

      <TextField
        label="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
        margin="normal"
      />

      <DatePicker
        label="Date"
        value={date}
        onChange={(newValue) => setDate(newValue)}
        renderInput={(params) => (
          <TextField {...params} fullWidth margin="normal" />
        )}
      />

      <TimePicker
        label="Time"
        value={time}
        onChange={(newValue) => setTime(newValue)}
        renderInput={(params) => (
          <TextField {...params} fullWidth margin="normal" />
        )}
      />

      <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
        Save Event
      </Button>
    </Box>
  );
}

export default EventForm;
