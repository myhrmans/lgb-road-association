import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthRoute from "./components/AuthRoute";

import Header from "./components/Header";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { FilePage } from "./pages/FilePage";
import { LoginForm } from "./components/LoginForm";
import { PopupModal } from "./components/"

const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <AuthRoute>
                <HomePage />
              </AuthRoute>
            }
          />
          <Route path="/protokoll" element={<FilePage />} />
          <Route path="login" element={<PopupModal content={<LoginForm />} buttonText="Logga in" />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
