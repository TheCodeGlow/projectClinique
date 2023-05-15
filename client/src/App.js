import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Auth/login';
import Register from './pages/Auth/register';
import Navbar from "./components/Navbar";
import DoctorPage from "./pages/DoctorPage";
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/doctor" element={<DoctorPage />} />
            </Routes>
        </Router>
    );
}

export default App;
