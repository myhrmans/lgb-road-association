import { Box, Typography } from "@mui/material";
import { NewsData } from "../../../common/types/Types";

export default function Post(props: NewsData) {
  return (
    <Box mb={4}>
      <Typography variant="h5">{props.title}</Typography>
      <Typography variant="subtitle1">
        {props.date.toLocaleDateString("sv-SE")}
      </Typography>
      <Typography mt={2}>{props.text}</Typography>
    </Box>
  );
}
