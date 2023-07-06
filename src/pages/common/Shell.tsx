import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";

export default function Shell() {
  return (
    <Grid container minHeight="100vh" direction="column" display="flex">
      <Header />
      <Grid container my={5} px={6} marginX="auto" maxWidth="lg">
        <Outlet />
      </Grid>
      <Footer />
    </Grid>
  );
}
