import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function NewsCard() {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 300 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Rubrik
        </Typography>
        <Typography sx={{ fontSize: 12, mb: 1.5 }} color="text.secondary">
          2023-01-05
        </Typography>
        <Typography variant="body2">
          Hallihallå, här står det information.
          <br />
          {"Och här står det mer"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Läs mer</Button>
      </CardActions>
    </Card>
  );
}
