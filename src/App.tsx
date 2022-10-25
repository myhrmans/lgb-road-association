import React from 'react';
import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/Home";
import AuthRoute from "./components/AuthRoute";

import Header from "./components/Header"
import Container from "@mui/material/Container";
import { ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {FilePage} from "./pages/FilePage";

const theme = createTheme({
    palette: {
        primary: {
            main: "#000"
        }
    }
});

function App() {
    return (
            <ThemeProvider theme={theme}>
                <Container maxWidth="lg">
                    <Header/>
                    <Routes>
                        <Route path="/" element={
                            // <AuthRoute>
                            //     <HomePage/>
                            // </AuthRoute>
                            <HomePage/>
                        }/>
                        <Route path="/protokoll" element={<FilePage/>} />
                    </Routes>
                </Container>
            </ThemeProvider>
    );
}

export default App;
