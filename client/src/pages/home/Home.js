import React from "react";
import useAuth from "../../hooks/useAuth";
import Dashboard from "../../components/home/Dashboard";



//Components
//import DoctorList from "../components/DoctorList";
//import PatientRecordsList from "../components/PatientRecordsList";
//import RemoteConsultationsList from "../components/RemoteConsultationsList";
//import PrescriptionList from "../components/PrescriptionList";
//import AppointmentScheduler from "../components/AppointmentScheduler";


function Home() {

//Auth
const { user } = useAuth();

if (user){
    console.log(user);
    return(<Dashboard />)
} else {
    console.log(user);
    // Not logged in view
    return (
        <div>
            <h1>Welcome to the Healthcare Portal!</h1>
            <p>Please log in to access your account.</p>
        </div>
    );
}
}


export default Home;