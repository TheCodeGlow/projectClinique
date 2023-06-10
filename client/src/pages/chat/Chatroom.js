// create a chat room for the user using react chat engine
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { ChatEngine, getOrCreateChat } from 'react-chat-engine';
import { usePatients } from "../../hooks/usePatients";
import { useDoctor } from "../../hooks/useDoctors";
import "../styles/DoctorProfile.css"


function Chatroom() {
    const { user } = useAuth();
    const [currentUser, setCurrentUser] = useState(
        {
            doctor: "",
            patient: ""
        }
    );
    const [patient, setPatient] = useState(null);
    useState(() => {
        if (user) {
            setCurrentUser(user);
        }
    }, [user]);

    const { patients } = usePatients();
    const { doctor } = useDoctor(currentUser.doctor);
    useEffect(() => {
        if (patients) {
            const currentPatient = patients.find(patient => patient._id === currentUser.patient);
            setPatient(currentPatient);
        }
    }, [patients, currentUser.patient]);
    if (currentUser.isDoctor) {
        if (!doctor || doctor === null) return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-3xl font-bold text-gray-800">Loading...</h1>
            </div>
        );

        return (
            <div className="w-100 mt-20 shadow-2xl shadow-blue rounded-lg p-3">
                <ChatEngine
                    height="100vh"
                    weidth="100%"
                    projectID="05e8fe9c-bf36-496a-bf00-1c5bfd1daa81"
                    userName={doctor.firstName + " " + doctor.lastName}
                    Email={currentUser.email}
                    userSecret={currentUser.password}

                />
            </div>
        )
    }
    if (!patient || patient === undefined) return (
        <div className="flex justify-center items-center h-screen">
            <h1 className="text-3xl font-bold text-gray-800">Loading...</h1>
        </div>
    );
    if (patient) {
        return (
            <div className="w-100 mt-20 shadow-2xl shadow-blue  rounded-lg  p-3">
                <ChatEngine
                    height="100vh"
                    projectID="05e8fe9c-bf36-496a-bf00-1c5bfd1daa81"
                    userName={patient.firstName + " " + patient.lastName}
                    Email={currentUser.email}
                    userSecret={currentUser.password}
                />
            </div>
        )
    }

    return (
        <h1>Chat</h1>
    )


}

export default Chatroom;