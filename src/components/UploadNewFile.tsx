import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { firebaseStorage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const theme = createTheme();

export const UploadNewFile = () => {
  const [fileUpload, setFileUpload] = useState<any | null>(null);

  const onUploadFile = () => {
    if (fileUpload == null) return;
    const fileRef = ref(
      firebaseStorage,
      `files/protocols/${fileUpload.name + v4()}`
    );
    uploadBytes(fileRef, fileUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {});
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ladda upp ny fil
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Upload
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(event) => {
                  setFileUpload(event.target.files![0]);
                }}
              />
            </Button>
            <Button
              //type="submit"
              onClick={() => onUploadFile()}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ladda upp
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
