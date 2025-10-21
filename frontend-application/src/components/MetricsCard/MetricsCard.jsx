import { Card, CardContent, Typography } from "@mui/material";
import styles from "./MetricsCard.module.css";

function MetricsCard({ title, value }) {
  return (
    <Card
      className={styles.cardBody}
      sx={{ minWidth: 150, m: 1, p: 1, backgroundColor: "#ecececff" }}
    >
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
      </CardContent>
    </Card>
  );
}

export default MetricsCard;
