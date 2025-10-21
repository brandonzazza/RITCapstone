import {
  Box,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Divider,
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

  const handleAdd = () => {
    const newAttendee = {
      name: "New Guest",
      email: `guest${Date.now()}@example.com`,
      status: "Maybe",
    };
    dispatch(addAttendee(newAttendee));
  };

  const handleDelete = (email) => {
    dispatch(deleteAttendee(email));
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        py: 6,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
          px: { xs: 2, sm: 4, md: 6 },
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {/*Event Info */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: "grey.250",
          }}
        >
          <DataCard Title="Event Info" />
        </Paper>

        {/*Metrics + Chart Section */}
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: "grey.250",
          }}
        >
          <Grid container spacing={4} alignItems="stretch">
            {" "}
            {/* stretch columns vertically */}
            {/* Metrics Cards - Left Side */}
            <Grid
              item
              xs={12}
              md={4}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              {metrics.map((m, i) => (
                <MetricsCard key={i} title={m.title} value={m.value} />
              ))}
            </Grid>
            {/* Chart Section - Right Side */}
            <Grid
              item
              xs={12}
              md={8}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center", // center horizontally
                  flexGrow: 1, // fill available vertical space
                  width: "100%",
                }}
              >
                <ChartCard
                  data={chartData}
                  type={chartType}
                  sx={{ width: "100%", maxWidth: 700, flexGrow: 1 }}
                />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <Button
                  variant={chartType === "pie" ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => dispatch(changeChartType("pie"))}
                >
                  Pie Chart
                </Button>
                <Button
                  variant={chartType === "bar" ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => dispatch(changeChartType("bar"))}
                >
                  Bar Chart
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/*Attendees Table */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: "grey.250",
          }}
        >
          <AttendeesTable
            attendees={attendees}
            onAdd={handleAdd}
            onDelete={handleDelete}
            onExport={handleExportCSV}
            onImport={handleImportCSV}
          />
        </Paper>

        {/* ⚙️ Settings Dialog */}
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
