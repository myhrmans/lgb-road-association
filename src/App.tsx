import React from 'react';
import './App.css';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import {initializeApp} from "firebase/app";
import {config} from "./config/config";
import AuthRoute from "./components/AuthRoute";

initializeApp(config.firebaseConfig);

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <AuthRoute>
                        <HomePage/>
                    </AuthRoute>
                }/>
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
