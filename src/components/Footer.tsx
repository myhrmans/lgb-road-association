import { Box, Container, Grid, Link, Typography } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import EmailIcon from "@mui/icons-material/Email";

export default function Footer(props: any) {
  return (
    <Grid container marginTop="auto">
      <Grid
        container
        sx={{
          backgroundColor: "#d9e3ea",
          height: "150px",
          bottom: 0,
          width: "100%",
        }}
        alignItems="center"
      >
        <Container sx={{ display: "flex", justifyContent: "center" }}>
          <Box width={300}>
            <PlaceIcon fontSize="large" color="secondary" sx={{ mx: "auto" }} />
            <Typography color="secondary">311 69, Ugglarp</Typography>
          </Box>
          <Box width={300}>
            <EmailIcon fontSize="large" color="secondary" sx={{ mx: 5 }} />
            <Typography color="secondary">
              lassagardsberg@fakeemail.com
            </Typography>
          </Box>
        </Container>
      </Grid>
      <Grid
        item
        sx={{
          backgroundColor: "#818b9b",
          height: "80px",
          width: "100%",
        }}
      >
        {/* <Box sx={{}}> */}
        <Typography variant="body2" align="center" {...props} marginY="30px">
          {"Copyright © "}
          <Link color="inherit" href="https://mui.com/">
            Lassagårdsbergs Vägförening
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
        {/* </Box> */}
      </Grid>
    </Grid>
  );
}
