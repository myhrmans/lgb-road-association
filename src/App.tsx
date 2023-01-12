import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Container from "@mui/material/Container";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { FilePage } from "./pages/FilePage";
import { AuthContextProvider } from "./common/contexts/AuthContext";
import { LoginForm } from "./components/LoginForm";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { Blaha } from "./pages/Blaha";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#000",
      },
      secondary: {
        main: "#469597",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <AuthContextProvider>
          <Routes>
            <Route element={<Header />} path="/">
              <Route element={<HomePage />} index />
              <Route element={<ProtectedRoutes />}>
                <Route element={<FilePage />} path="/protokoll" />
              </Route>
              <Route element={<Blaha />} path="blaha" />
              <Route element={<LoginForm />} path="login" />
            </Route>
          </Routes>
        </AuthContextProvider>
      </Container>
    </ThemeProvider>
  );
}

export default App;
