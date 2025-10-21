import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Card, CardContent } from "@mui/material";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function ChartCard({ data, type }) {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // allows full flex fill
    plugins: {
      legend: {
        position: "bottom",
        labels: { boxWidth: 15, padding: 15 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // ensure whole numbers
          callback: (value) => (Number.isInteger(value) ? value : null),
        },
      },
    },
  };

  return (
    <Card
      sx={{
        width: "100%",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <div style={{ width: "100%", height: "100%" }}>
          {type === "pie" ? (
            <Pie data={data} options={chartOptions} />
          ) : (
            <Bar data={data} options={chartOptions} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default ChartCard;
