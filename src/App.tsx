import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home-page/HomePage";
import Shell from "./pages/common/Shell";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { FilePage } from "./pages/file-page/FilePage";
import { AuthContextProvider } from "./common/contexts/AuthContext";
import { LoginForm } from "./pages/common/LoginForm";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import NewsPage from "./pages/news-page/NewsPage";
import { ContactPage } from "./pages/contact-page/ContactPage";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#d9e3ea",
      },
      secondary: {
        main: "#818b9b",
      },
      text: {
        secondary: "#818b9b",
      },
      info: {
        main: "#bdbdbd"
      }
    },
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60, // 1 hour
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthContextProvider>
          <Routes>
            <Route element={<Shell />} path="/">
              <Route element={<HomePage />} index />
              <Route element={<ProtectedRoutes />}>
                <Route element={<FilePage />} path="/protokoll" />
                <Route element={<NewsPage />} path="/handelser" />
                <Route element={<ContactPage />} path="/kontakt" />
              </Route>
              <Route element={<LoginForm />} path="login" />
            </Route>
          </Routes>
        </AuthContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
