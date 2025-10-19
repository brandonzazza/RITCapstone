import {
  Box,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Papa from "papaparse";
import {
  addAttendee,
  deleteAttendee,
  importAttendees,
  changeChartType,
  updateField,
} from "../../features/events/eventsSlice";
import DataCard from "../ProjectForm/ProjectForm";
import MetricsCard from "../MetricsCard/MetricsCard";
import ChartCard from "../ChartCard/ChartCard";
import AttendeesTable from "../AttendeesTable/AttendeesTable";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const attendees = useSelector((state) => state.events.attendees);
  const chartType = useSelector((state) => state.events.chartType);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Count metrics
  const metrics = ["Going", "Not Going", "Maybe"].map((status) => ({
    title: status,
    value: attendees.filter((a) => a.status === status).length,
  }));

  // Chart data
  const chartData = {
    labels: metrics.map((m) => m.title),
    datasets: [
      {
        label: "RSVPs",
        data: metrics.map((m) => m.value),
        backgroundColor: ["#3b82f6", "#ef4444", "#facc15"],
      },
    ],
  };

  // CSV export
  const handleExportCSV = () => {
    const csv = Papa.unparse(attendees);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "attendees.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // CSV import
  const handleImportCSV = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => dispatch(importAttendees(results.data)),
    });
  };

  // Add a sample attendee (you could wire this to a form)
  const handleAdd = () => {
    const newAttendee = {
      name: "New Guest",
      email: `guest${Date.now()}@example.com`,
      status: "Maybe",
    };
    dispatch(addAttendee(newAttendee));
  };

  // Delete an attendee
  const handleDelete = (email) => {
    dispatch(deleteAttendee(email));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateProjectField({ field: name, value }));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Box
          sx={{
            width: "75%",
            mx: "auto",
            py: 4,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <DataCard Title="Event Info" />

          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Event Data
          </Typography>

          {/* Metrics + Chart Section */}
          <Grid
            container
            spacing={4}
            sx={{ justifyContent: "center", alignItems: "flex-start" }}
          >
            {/* Metrics Cards */}
            <Grid
              item
              xs={12}
              md={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  justifyContent: "space-between",
                }}
              >
                {metrics.map((m, i) => (
                  <MetricsCard key={i} title={m.title} value={m.value} />
                ))}
              </Box>
            </Grid>

            {/* Chart Section */}
            <Grid
              item
              xs={12}
              md={8}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <ChartCard data={chartData} type={chartType} />
                <Box>
                  <Button
                    variant="contained"
                    onClick={() => dispatch(changeChartType("pie"))}
                    sx={{ mr: 1 }}
                  >
                    Pie
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => dispatch(changeChartType("bar"))}
                  >
                    Bar
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Attendees Table */}
          <AttendeesTable
            attendees={attendees}
            onAdd={handleAdd}
            onDelete={handleDelete}
            onExport={handleExportCSV}
            onImport={handleImportCSV}
          />
        </Box>

        {/* Settings Popout */}
        <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)}>
          <DialogTitle>Settings</DialogTitle>
          <DialogContent>
            <Typography>Settings content goes here</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSettingsOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Dashboard;
