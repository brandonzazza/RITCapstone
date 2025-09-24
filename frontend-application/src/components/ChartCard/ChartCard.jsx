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
  return (
    <Card sx={{ m: 1, p: 2 }}>
      <CardContent>
        <div style={{ maxWidth: "100%", maxHeight: 300, margin: "0 auto" }}>
          {type === "pie" ? <Pie data={data} /> : <Bar data={data} />}
        </div>
      </CardContent>
    </Card>
  );
}

export default ChartCard;
