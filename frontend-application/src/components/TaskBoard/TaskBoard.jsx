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

export default function TaskBoard() {
  const [columns, setColumns] = useState({
    tasks: {
      name: "Tasks",
      items: [{ id: "1", content: "Set up CI/CD" }],
    },
    inProgress: {
      name: "In Progress",
      items: [{ id: "2", content: "Implement auth" }],
    },
    complete: {
      name: "Complete",
      items: [{ id: "3", content: "Design dashboard" }],
    },
  });

  const [newTask, setNewTask] = useState({ column: "tasks", text: "" });

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceColumn, items: sourceItems },
        [destination.droppableId]: { ...destColumn, items: destItems },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: { ...column, items: copiedItems },
      });
    }
  };

  const handleAddTask = () => {
    if (!newTask.text.trim()) return;
    const id = Date.now().toString();
    const updatedColumn = {
      ...columns[newTask.column],
      items: [
        ...columns[newTask.column].items,
        { id, content: newTask.text.trim() },
      ],
    };
    setColumns({ ...columns, [newTask.column]: updatedColumn });
    setNewTask({ column: "tasks", text: "" });
  };

  const handleDeleteTask = (columnId, taskId) => {
    const updatedColumn = {
      ...columns[columnId],
      items: columns[columnId].items.filter((item) => item.id !== taskId),
    };
    setColumns({ ...columns, [columnId]: updatedColumn });
  };

  // Chart data
  const totalTasks =
    columns.tasks.items.length +
    columns.inProgress.items.length +
    columns.complete.items.length;

  const data = [
    { name: "Tasks", value: columns.tasks.items.length },
    { name: "In Progress", value: columns.inProgress.items.length },
    { name: "Complete", value: columns.complete.items.length },
  ];

  const COLORS = ["#2196f3", "#ff9800", "#4caf50"];

  return (
    <Box
      sx={{
        p: 4,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Dev Task Board
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
            onChange={(e) => setNewTask({ ...newTask, column: e.target.value })}
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

      {/* Main Layout */}
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
          {Object.entries(columns).map(([columnId, column]) => (
            <Box
              key={columnId}
              sx={{
                flex: 1,
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                p: 2,
                display: "flex",
                flexDirection: "column",
                minHeight: "calc(100vh - 300px)", // fill most of the page
              }}
            >
              <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
              >
                {column.name}
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
                        : "#fafafa",
                      borderRadius: 2,
                      p: 1,
                      overflowY: "auto",
                    }}
                  >
                    {column.items.map((item, index) => (
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

      {/* Progress Chart */}
      <Box
        sx={{
          height: 300,
          backgroundColor: "#fafafa",
          borderRadius: 2,
          p: 2,
          boxShadow: 1,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          Task Completion Overview ({totalTasks} total)
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
  );
}
