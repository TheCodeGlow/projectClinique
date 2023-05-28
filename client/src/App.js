import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/Auth/login';
import Register from './pages/Auth/register';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import DoctorPage from "./pages/DoctorPage";
import DoctorProfile from './pages/profile/DoctorProfile';
import DashboardPage from './pages/Dashboard/PatientDashboard';
function App() {
    return (
        <div className="mainWrapper">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/doctor" element={<DoctorPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/profile" element={<DoctorProfile />} />
                </Routes>
                 <Footer /> 
            </Router>
        </div>
    );
}

export default App;
