import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useDoctors } from "../hooks/useDoctors";
import usePatientRecords from "../hooks/usePatientRecords";
import useRemoteConsultation from "../hooks/useRemoteConsultation";
import usePrescriptions from "../hooks/usePrescriptions";
import DoctorList from "../components/DoctorList";
import PatientRecordsList from "../components/PatientRecordsList";
import RemoteConsultationsList from "../components/RemoteConsultationsList";
import PrescriptionList from "../components/PrescriptionList";
import AppointmentScheduler from "../components/AppointmentScheduler";


function Home() {
    const { user } = useContext(UserContext);

    // Fetch doctors data using custom hook
    const { data: doctorsData, isLoading: isDoctorsLoading } = useDoctors();

    // Fetch patient records data using custom hook
    const { data: patientRecordsData, isLoading: isPatientRecordsLoading } =
        usePatientRecords();

    // Fetch remote consultations data using custom hook
    const {
        data: remoteConsultationsData,
        isLoading: isRemoteConsultationsLoading,
    } = useRemoteConsultation();

    // Fetch prescriptions data using custom hook
    const { data: prescriptionsData, isLoading: isPrescriptionsLoading } =
        usePrescriptions();

    return (
        <div className="home-container">
            {user ? (
                <>
                    {user.role === "patient" && (
                        <>
                            <h2>Doctors</h2>
                            {isDoctorsLoading ? (
                                <p>Loading doctors...</p>
                            ) : (
                                <DoctorList doctors={doctorsData} />
                            )}
                            <h2>My Records</h2>
                            {isPatientRecordsLoading ? (
                                <p>Loading patient records...</p>
                            ) : (
                                <PatientRecordsList patientRecords={patientRecordsData} />
                            )}
                            <h2>My Appointments</h2>
                            <AppointmentScheduler />

                            <h2>My Prescriptions</h2>
                            {isPrescriptionsLoading ? (
                                <p>Loading prescriptions...</p>
                            ) : (
                                <PrescriptionList prescriptions={prescriptionsData} />
                            )}

                        </>
                    )}
                    {user.role === "doctor" && (
                        <>
                            <h2>Appointments</h2>
                            <AppointmentScheduler />
                            <h2>Remote Consultations</h2>
                            {isRemoteConsultationsLoading ? (
                                <p>Loading remote consultations...</p>
                            ) : (
                                <RemoteConsultationsList
                                    remoteConsultations={remoteConsultationsData}
                                />
                            )}
                            <h2>Prescriptions</h2>
                            {isPrescriptionsLoading ? (
                                <p>Loading prescriptions...</p>
                            ) : (
                                <PrescriptionList prescriptions={prescriptionsData} />
                            )}
                        </>
                    )}
                </>
            ) : (
                <p>Please login to access your dashboard.</p>
            )}
        </div>
    );
}

export default Home;