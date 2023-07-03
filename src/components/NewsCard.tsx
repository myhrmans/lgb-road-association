import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { NewsData } from "../common/types/Types";

export default function NewsCard(props: NewsData) {
  const navigate = useNavigate();

  return (
    <Card sx={{ minWidth: 275, maxWidth: 300, mb: 1.5 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {props.title}
        </Typography>
        <Typography sx={{ fontSize: 12, mb: 1.5 }} color="text.secondary">
          {props.date.toLocaleDateString("sv-SE")}
        </Typography>
        <Typography variant="body2">
          {props.text.length > 100
            ? props.text.substring(0, 100) + "..."
            : props.text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate("/handelser")}>
          Läs mer
        </Button>
      </CardActions>
    </Card>
  );
}
