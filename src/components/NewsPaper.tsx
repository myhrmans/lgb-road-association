import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import NewsCard from "./NewsCard";

export default function NewsPaper() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 128,
          height: "auto",
        },
      }}
    >
      <Paper>
        
      </Paper>
    </Box>
  );
}
