import { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { CalendarIcon } from "@mui/x-date-pickers";
import { EventNote } from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";

export default function MainLayout() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const handleLogout = () => {
    // clear token/session
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }}>
          <List>
            <ListItemButton onClick={() => navigate("/dashboard")}>
              <ListItemIcon>
                <CalendarIcon />
              </ListItemIcon>
              <ListItemText primary="Event" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/tasks")}>
              <ListItemIcon>
                <EventNote />
              </ListItemIcon>
              <ListItemText primary="Tasks" />
            </ListItemButton>
            <ListItemButton onClick={() => setSettingsOpen(true)}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
            <ListItemButton onClick={handleLogout}>
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
        <AppBar position="sticky" sx={{ backgroundColor: "var(--primary)" }}>
          <Toolbar>
            <IconButton
              edge="start"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ mr: 2, backgroundColor: "var(--primary)" }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Event Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Dynamic body */}
        <Box sx={{ width: "75%", mx: "auto", py: 4 }}>
          <Outlet /> {/* The body content of child route goes here */}
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
}
