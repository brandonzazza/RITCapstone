// Dashboard.jsx
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
  MenuItem,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

import DataCard from "../ProjectForm/ProjectForm";
import MetricsCard from "../MetricsCard/MetricsCard";
import ChartCard from "../ChartCard/ChartCard";
import AttendeesTable from "../AttendeesTable/AttendeesTable";
import Papa from "papaparse";
import { CalendarIcon } from "@mui/x-date-pickers";
import { EventNote, MenuBook } from "@mui/icons-material";

// Dummy data
const initialAttendees = [
  { name: "Alice", email: "alice@example.com", status: "Going" },
  { name: "Bob", email: "bob@example.com", status: "Not Going" },
  { name: "Charlie", email: "charlie@example.com", status: "Maybe" },
];

const Dashboard = () => {
  const [chartType, setChartType] = useState("pie");
  const [attendees, setAttendees] = useState(initialAttendees);
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      {/* Sidebar Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItemButton>
              <ListItemIcon>
                <CalendarIcon />
              </ListItemIcon>
              <ListItemText primary="Event" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <EventNote />
              </ListItemIcon>
              <ListItemText primary="Tasks" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        {/* Full-width AppBar */}
        <AppBar
          position="sticky"
          color="primary"
          sx={{ width: "100%", boxSizing: "border-box" }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Event Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Dashboard Body */}
        <Box
          sx={{
            width: "75%", // ~75% of screen width
            mx: "auto", // center horizontally
            py: 4,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          {/* Project Info */}
          <DataCard Title="Event Info" />

          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Event Data
          </Typography>
          <Grid
            container
            spacing={4}
            sx={{
              justifyContent: "center", // center the columns horizontally
              alignItems: "flex-start", // optional, aligns items at top
            }}
          >
            {/* Metrics Column */}

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

            {/* Chart Column */}
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

          {/* Attendees Table */}
          <AttendeesTable
            attendees={attendees}
            onAdd={() => {}}
            onEdit={() => {}}
            onDelete={() => {}}
            onExport={handleExportCSV}
            onImport={handleImportCSV}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
