import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function AttendeesTable({
  attendees,
  onAdd,
  onDelete,
  onEdit,
  onExport,
  onImport,
}) {
  const [open, setOpen] = useState(false);
  const [newAttendee, setNewAttendee] = useState({
    name: "",
    email: "",
    status: "Going",
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrEdit = () => {
    if (editIndex !== null) {
      onEdit(editIndex, newAttendee);
      setEditIndex(null);
    } else {
      onAdd(newAttendee);
    }
    setNewAttendee({ name: "", email: "", status: "Going" });
    setOpen(false);
  };

  const handleEditClick = (index) => {
    setNewAttendee(attendees[index]);
    setEditIndex(index);
    setOpen(true);
  };

  const handleDeleteClick = (index) => {
    onDelete(index);
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
        Attendee Data
      </Typography>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ mr: 1 }}>
        Add Attendee
      </Button>
      <Button variant="outlined" onClick={onExport} sx={{ mr: 1 }}>
        Export CSV
      </Button>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => onImport(e.target.files[0])}
        style={{ display: "inline-block" }}
      />

      {/* Add/Edit Modal */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {editIndex !== null ? "Edit Attendee" : "Add Attendee"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={newAttendee.name}
            onChange={(e) =>
              setNewAttendee({ ...newAttendee, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={newAttendee.email}
            onChange={(e) =>
              setNewAttendee({ ...newAttendee, email: e.target.value })
            }
          />

          {/* Dropdown for Status */}
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              value={newAttendee.status}
              onChange={(e) =>
                setNewAttendee({ ...newAttendee, status: e.target.value })
              }
              label="Status"
            >
              <MenuItem value="Going">Going</MenuItem>
              <MenuItem value="Not Going">Not Going</MenuItem>
              <MenuItem value="Maybe">Maybe</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddOrEdit}>
            {editIndex !== null ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Table */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendees.map((a, i) => (
              <TableRow key={i}>
                <TableCell>{a.name}</TableCell>
                <TableCell>{a.email}</TableCell>
                <TableCell>{a.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(i)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(i)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AttendeesTable;
