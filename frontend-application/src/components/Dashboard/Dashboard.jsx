import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { CalendarIcon } from "@mui/x-date-pickers";
import { EventNote } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import DataCard from "../ProjectForm/ProjectForm";
import MetricsCard from "../MetricsCard/MetricsCard";
import ChartCard from "../ChartCard/ChartCard";
import AttendeesTable from "../AttendeesTable/AttendeesTable";
import Papa from "papaparse";

const initialAttendees = [
  { name: "Alice", email: "alice@example.com", status: "Going" },
  { name: "Bob", email: "bob@example.com", status: "Not Going" },
  { name: "Charlie", email: "charlie@example.com", status: "Maybe" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [chartType, setChartType] = useState("pie");
  const [attendees, setAttendees] = useState(initialAttendees);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const metrics = ["Going", "Not Going", "Maybe"].map((status) => ({
    title: status,
    value: attendees.filter((a) => a.status === status).length,
  }));

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

  const handleImportCSV = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => setAttendees((prev) => [...prev, ...results.data]),
    });
  };

  const handleLogout = () => {
    // Clear session or token
    console.log("Logged out");
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        {/* Dashboard Body */}
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
          <Grid
            container
            spacing={4}
            sx={{ justifyContent: "center", alignItems: "flex-start" }}
          >
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
                    onClick={() => setChartType("pie")}
                    sx={{ mr: 1 }}
                  >
                    Pie
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => setChartType("bar")}
                  >
                    Bar
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <AttendeesTable
            attendees={attendees}
            onAdd={() => {}}
            onEdit={() => {}}
            onDelete={() => {}}
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
