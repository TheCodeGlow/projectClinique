import React, { useState, useEffect } from "react";
import { usePatientPrescriptions } from "../../hooks/usePrescriptions";
import { useDoctors } from '../../hooks/useDoctors';
import useAuth from '../../hooks/useAuth';
import "../styles/DoctorPage.css";
import { jsPDF } from "jspdf";

const PatientPrescriptions = () => {
    const { user } = useAuth();
    const [currentUser, setCurrentUser] = useState({ patient: '' });
    const [doctor, setDoctor] = useState({});
    const [selectedPrescription, setSelectedPrescription] = useState(null);
    const [FiltredPrescriptions, setFiltredPrescriptions] = useState([]);
    const { doctors } = useDoctors();
    const { prescriptions} = usePatientPrescriptions(currentUser.patient);

    useEffect(() => {
        if (user)
            setCurrentUser(user);
    }, [user]);

    useEffect(() => {
        if (doctors && prescriptions) {
            // get prescriptions for selected doctor
            const prescriptionbydoctor = prescriptions.filter((prescription) => prescription.doctor === doctor);
            setFiltredPrescriptions(prescriptionbydoctor);
        }
    }, [doctor, prescriptions, doctors]);

    const generatePdf = () => {
        if (!selectedPrescription || !doctors) return;
        const currentDoctor = doctors.find((doc) => doc._id === doctor);

        const doc = new jsPDF();
        const marginLeft = 20;
        const marginTop = 20;

        doc.setFontSize(24);
        doc.text("Prescription", marginLeft+65, marginTop);

        doc.setFontSize(18);
        doc.text(`Doctor: ${currentDoctor.firstName} ${currentDoctor.lastName}`, marginLeft, marginTop + 20);
        doc.setFontSize(16);
        doc.text(`Medication: ${selectedPrescription.medication}`, marginLeft, marginTop + 40);
        doc.text(`Dosage: ${selectedPrescription.dosage}`, marginLeft, marginTop + 60);
        doc.text(`Instructions: ${selectedPrescription.instructions}`, marginLeft, marginTop + 80);
        doc.text(`Refills: ${selectedPrescription.refills}`, marginLeft, marginTop + 100);
        doc.text(
            `Next Refill Date: ${new Date(selectedPrescription.refillDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })}`,
            marginLeft,
            marginTop + 120
        );

        const pdfDataUri = doc.output("datauristring");
        const link = document.createElement("a");
        link.href = pdfDataUri;
        link.download = "prescription-"+selectedPrescription.medication+".pdf";
        link.click();
    };


    return (
        <div className="w-3/5 mx-auto mt-8 shadow-lg shadow-blue rounded-lg p-10  ">
            <div className="m-4">
                <label htmlFor="doctor" className="block text-gray-500 font-bold text-xl mb-2">
                    Doctor:
                </label>
                <select
                    id="doctor"
                    className="border-gray-500 text-gray-500 text-lg font-semibold focus:ring-blue-500 focus:border-blue-500 block w-full p-2 rounded-md shadow-sm"
                    onClick={(e) => setDoctor(e.target.value)}
                    required
                >
                    <option className='text-gray-500 text-lg font-semibold' value="">Select a doctor</option>
                    {doctors &&
                        doctors.map((doctor) => (
                            <option key={doctor._id} value={doctor._id} className='text-gray-500 text-lg font-semibold'>
                                {doctor.firstName} {doctor.lastName}
                            </option>
                        ))}
                </select>
            </div>
            <div className="grid grid-cols-2 ">
                <div className=" col-span-1 overflow-y-scroll shadow-md" style={{ height: "650px" }}>
                    {FiltredPrescriptions.length !== 0 ? FiltredPrescriptions.map((prescription) => (
                        <div key={prescription._id} className="bg-white p-4 mb-1 border-gray-300 border-2 rounded-md shadow-md
                        hover:border-blue-500 hover:bg-gray-200 hover:shadow-lg cursor-pointer"
                            onClick={() => { setSelectedPrescription(prescription) }}>
                            <h2 className="text-lg font-semibold">{prescription.medication}</h2>
                            <p className="text-gray-500">{prescription.dosage}</p>
                            <p className="text-gray-500">{prescription.instructions}</p>
                            <p className="text-gray-500">Refills: {prescription.refills}</p>
                            <p className="text-gray-500">Next Refill Date: {
                                new Date(prescription.refillDate).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })
                            }</p>
                        </div>
                    )) :
                        <div className="bg-white p-4 mb-2 border-gray-300 border-2 rounded-md shadow-md">
                            <h2 className="text-lg font-semibold">No Prescriptions </h2>
                        </div>
                    }
                </div>
                <div className="bg-white col-span-1 p-4 h-3/5 shadow-md rounded-md" style={{ height: "650px" }}>
                    <h2 className="text-lg text-center font-semibold">Prescription</h2>
                    {selectedPrescription ? (
                        <div className="flex flex-col justify-between mt-5 ">
                            <div>
                                <p className="text-gray-500 mb-4">
                                    <span className="font-semibold">Medication:</span> {selectedPrescription.medication}
                                </p>
                                <p className="text-gray-500 mb-4">
                                    <span className="font-semibold">Dosage:</span> {selectedPrescription.dosage}
                                </p>
                                <p className="text-gray-500 mb-4">
                                    <span className="font-semibold">Instructions:</span> {selectedPrescription.instructions}
                                </p>
                                <p className="text-gray-500 mb-4">
                                    <span className="font-semibold">Refills:</span> {selectedPrescription.refills}
                                </p>
                                <p className="text-gray-500">
                                    <span className="font-semibold">Next Refill Date:</span>{" "}
                                    {new Date(selectedPrescription.refillDate).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            </div>
                            <div className="flex justify-center mt-20">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-1/2"
                                    onClick={generatePdf}
                                >
                                    Print
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-full">
                            <p className="text-gray-500">Select a prescription to view</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default PatientPrescriptions;
