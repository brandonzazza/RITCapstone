import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  IconButton,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSelector, useDispatch } from "react-redux";
import { addTask, moveTask, deleteTask } from "../../features/tasks/tasksSlice";

export default function TaskBoard() {
  const dispatch = useDispatch();

  // Get Redux state for all columns
  const columns = useSelector((state) => state.tasks.tasks);

  // Local input state
  const [newTask, setNewTask] = useState({ column: "tasks", text: "" });

  // Handle adding a new task
  const handleAddTask = () => {
    if (!newTask.text.trim()) return;
    const id = Date.now().toString();
    dispatch(
      addTask({
        column: newTask.column,
        task: { id, content: newTask.text.trim() },
      })
    );
    setNewTask({ column: "tasks", text: "" });
  };

  // Handle deleting a task
  const handleDeleteTask = (columnId, taskId) => {
    dispatch(deleteTask({ column: columnId, taskId }));
  };

  // Handle drag & drop between columns
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    dispatch(
      moveTask({
        from: source.droppableId,
        to: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      })
    );
  };

  // Chart data
  const totalTasks =
    columns.tasks.length + columns.inProgress.length + columns.complete.length;

  const data = [
    { name: "Tasks", value: columns.tasks.length },
    { name: "In Progress", value: columns.inProgress.length },
    { name: "Complete", value: columns.complete.length },
  ];

  const COLORS = ["#2196f3", "#ff9800", "#4caf50"];

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 3,
        backgroundColor: "grey.250",
      }}
    >
      <Box
        sx={{
          p: 4,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
          Event Tasks
        </Typography>

        {/* Add Task Form */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="New Task"
              variant="outlined"
              value={newTask.text}
              onChange={(e) => setNewTask({ ...newTask, text: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              fullWidth
              label="Add to Column"
              value={newTask.column}
              onChange={(e) =>
                setNewTask({ ...newTask, column: e.target.value })
              }
              SelectProps={{ native: true }}
            >
              <option value="tasks">Tasks</option>
              <option value="inProgress">In Progress</option>
              <option value="complete">Complete</option>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleAddTask}
            >
              Add Task
            </Button>
          </Grid>
        </Grid>

        {/* Main Columns */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "stretch",
            gap: 2,
            mb: 4,
          }}
        >
          <DragDropContext onDragEnd={onDragEnd}>
            {Object.entries(columns).map(([columnId, items]) => (
              <Box
                key={columnId}
                sx={{
                  flex: 1,
                  backgroundColor: "#ecececff",
                  borderRadius: 2,
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "calc(100vh - 300px)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
                >
                  {columnId === "tasks"
                    ? "Tasks"
                    : columnId === "inProgress"
                    ? "In Progress"
                    : "Complete"}
                </Typography>

                <Droppable droppableId={columnId}>
                  {(provided, snapshot) => (
                    <Box
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      sx={{
                        flexGrow: 1,
                        backgroundColor: snapshot.isDraggingOver
                          ? "#e3f2fd"
                          : "#ffffffff",
                        borderRadius: 2,
                        p: 1,
                        overflowY: "auto",
                      }}
                    >
                      {items.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              sx={{
                                mb: 1,
                                backgroundColor: snapshot.isDragging
                                  ? "#bbdefb"
                                  : "white",
                                boxShadow: 2,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                px: 1,
                              }}
                            >
                              <CardContent sx={{ flexGrow: 1 }}>
                                <Typography>{item.content}</Typography>
                              </CardContent>
                              <IconButton
                                color="error"
                                onClick={() =>
                                  handleDeleteTask(columnId, item.id)
                                }
                                size="small"
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </Box>
            ))}
          </DragDropContext>
        </Box>

        {/* Chart */}
        <Box
          sx={{
            height: 300,
            backgroundColor: "#ecececff",
            borderRadius: 2,
            p: 2,
            boxShadow: 1,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Tasks Overview ({totalTasks} total)
          </Typography>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Paper>
  );
}
