import { Paper } from "@mui/material";

export function CarouselItem(imageUrl: string) {
  return (
    <Paper>
      <img src={imageUrl} />
    </Paper>
  );
}
