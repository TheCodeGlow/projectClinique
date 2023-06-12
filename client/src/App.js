import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/Auth/login';
import Register from './pages/Auth/register';
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer"
import DoctorPage from "./pages/DoctorPage";
import PatientProfile from './pages/profile/PatientProfile';
import DoctorProfile from './pages/profile/DoctorProfile';
import PatientDashboard from './pages/Dashboard/PatientDashboard';
import DoctorDashboard from './pages/Dashboard/DoctorDashboard';
import DoctorEdit from './pages/profile/DoctorEdit';
import PatientEdit from './pages/profile/PatientEdit';
import Chatroom from './pages/chat/Chatroom';
import ReviewPage from './pages/review/ReviewPage';
import DoctorPrescriptions from './pages/prescriptions/DoctorPrescriptions';
import PatientPrescriptions from './pages/prescriptions/PatientPrescriptions';
function App() {
    return (
        <div className="mainWrapper">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/doctors" element={<DoctorPage />} />
                    <Route path="/patient/dashboard" element={<PatientDashboard />} />
                    <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
                    <Route path="/doctor/:id" element={<DoctorProfile />} />
                    <Route path="/doctor/:id/edit" element={<DoctorEdit />} />
                    <Route path="/patient/:id" element={<PatientProfile />} />
                    <Route path="/patient/:id/edit" element={<PatientEdit />} />
                    <Route path="/doctor/prescriptions" element={<DoctorPrescriptions />} />
                    <Route path="/patient/prescriptions" element={<PatientPrescriptions />} />
                    <Route path="/Chat" element={<Chatroom />} />
                    <Route path="/review" element={<ReviewPage />} />
                </Routes>
                 <Footer /> 
            </Router>
        </div>
    );
}

export default App;
