// Prescription Schema
// patient: (ObjectId, ref: 'Patient', required) reference to the patient associated with the prescription
// date: (Date, required) date of the prescription
// medication: (String, required) name of the medication prescribed
// dosage: (String, required) dosage of the medication prescribed
// instructions: (String, required) instructions for taking the medication prescribed
// refills: (Number, required) number of refills of the prescription
// refillDate: (Date, required) date of the next refill of the prescription

import react, { useState, useEffect } from "react";
import {
    usePatientPrescriptions,
    useCreatePatientPrescription,
    useUpdatePatientPrescription,
    useDeletePatientPrescription,
} from "../../hooks/usePrescriptions";
import { useDoctors } from '../../hooks/useDoctors';
import useAuth from '../../hooks/useAuth';
import { usePatients } from '../../hooks/usePatients';
import "../styles/DoctorPage.css"


const DoctorPrescriptions = () => {
    const { user } = useAuth();
    const [patient, setPatient] = useState({});
    const [medication, setMedication] = useState("");
    const [dosage, setDosage] = useState("");
    const [instructions, setInstructions] = useState("");
    const [refills, setRefills] = useState(0);
    const [refillDate, setRefillDate] = useState("");
    const [selectedPrescription, setSelectedPrescription] = useState(null);
    const { patients, isLoading: patientLoading } = usePatients();
    const { prescriptions, isLoading: prescriptionLoading } =
        usePatientPrescriptions(patient);

    const {
        mutate: createPrescription,
        isLoading: createLoading,
        isError: createError,
        isSuccess: createSuccess,
    } = useCreatePatientPrescription();
    const {
        mutate: updatePrescription,
        isLoading: updateLoading,
        isError: updateError,
        isSuccess: updateSuccess,
    } = useUpdatePatientPrescription();
    const {
        mutate: deletePrescription,
        isLoading: deleteLoading,
        isError: deleteError,
        isSuccess: deleteSuccess,
    } = useDeletePatientPrescription();

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleCreatePrescription = (e) => {
        e.preventDefault();
        const newPrescription = {
            patient: patient,
            doctor: user.doctor,
            date: new Date(),
            medication: medication,
            dosage: dosage,
            instructions: instructions,
            refills: refills,
            refillDate: refillDate,
        };
        createPrescription({ newPrescription, id: patient });
        // Reset form fields after submitting
        setMedication("");
        setDosage("");
        setInstructions("");
        setRefills(0);
        setRefillDate("");
    };

    const handleUpdatePrescription = (e) => {
        e.preventDefault();
        const updatedPrescription = {
            ...selectedPrescription,
            patient: patient,
            doctor: user.doctor,
            medication: medication,
            dosage: dosage,
            instructions: instructions,
            refills: refills,
            refillDate: refillDate,
        };
        updatePrescription({ updatedPrescription, id: patient });
        // Reset form fields after updating
        setSelectedPrescription(null);
        setMedication("");
        setDosage("");
        setInstructions("");
        setRefills(0);
        setRefillDate("");
    };

    const handleDeletePrescription = (e) => {
        e.preventDefault();
        deletePrescription({
            id: patient,
            prescription_id: selectedPrescription._id,
        });
        // Reset form fields after deleting
        setSelectedPrescription(null);
        setMedication("");
        setDosage("");
        setInstructions("");
        setRefills(0);
        setRefillDate("");
    };

    useEffect(() => {
        let timeoutId;

        if (createError) {
            setErrorMessage("Error creating prescription");
            timeoutId = setTimeout(() => {
                setErrorMessage("");
            }, 5000); // 5 seconds
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [createError]);

    useEffect(() => {
        let timeoutId;

        if (createSuccess) {
            setSuccessMessage("Prescription created successfully");
            timeoutId = setTimeout(() => {
                setSuccessMessage("");
            }, 5000); // 5 seconds
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [createSuccess]);

    useEffect(() => {
        let timeoutId;

        if (updateError) {
            setErrorMessage("Error updating prescription");
            timeoutId = setTimeout(() => {
                setErrorMessage("");
            }, 5000); // 5 seconds
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [updateError]);

    useEffect(() => {
        let timeoutId;

        if (updateSuccess) {
            setSuccessMessage("Prescription updated successfully");
            timeoutId = setTimeout(() => {
                setSuccessMessage("");
            }, 5000); // 5 seconds
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [updateSuccess]);

    useEffect(() => {
        let timeoutId;

        if (deleteError) {
            setErrorMessage("Error deleting prescription");
            timeoutId = setTimeout(() => {
                setErrorMessage("");
            }, 5000); // 5 seconds
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [deleteError]);

    useEffect(() => {
        let timeoutId;

        if (deleteSuccess) {
            setSuccessMessage("Prescription deleted successfully");
            timeoutId = setTimeout(() => {
                setSuccessMessage("");
            }, 5000); // 5 seconds
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [deleteSuccess]);

    return (
        <div className="w-3/5 mx-auto mt-8 shadow-lg shadow-blue rounded-lg p-10  ">
            <div className="m-4">
                <label htmlFor="doctor" className="block text-gray-500 font-bold text-xl mb-2">
                    Patient
                </label>
                <select
                    id="doctor"
                    className="border-gray-500 text-gray-500 text-lg font-semibold focus:ring-blue-500 focus:border-blue-500 block w-full p-2 rounded-md shadow-sm"
                    onClick={(e) => setPatient(e.target.value)}
                    required
                >
                    <option className='text-gray-500 text-lg font-semibold' value="">Select a patient</option>
                    {patients &&
                        patients.map((patient) => (
                            <option key={patient.id} value={patient._id} className='text-gray-500 text-lg font-semibold'>
                                {patient.firstName} {patient.lastName}
                            </option>
                        ))}
                </select>
            </div>
            <div className="grid grid-cols-2 ">
                <div className=" col-span-1 overflow-y-scroll shadow-md" style={{ height: "650px" }}>
                    <div className="bg-white p-4 mb-1 border-gray-300 border-2 rounded-md shadow-md
                        hover:border-blue-500 hover:bg-gray-200 hover:shadow-lg cursor-pointer"
                        onClick={
                            () => setSelectedPrescription(null)
                        }>
                        <h2 className="text-lg font-semibold">Add Prescription</h2>
                    </div>
                    {prescriptions ? prescriptions.map((prescription) => (
                        <div key={prescription._id} className="bg-white p-4 mb-1 border-gray-300 border-2 rounded-md shadow-md
                        hover:border-blue-500 hover:bg-gray-200 hover:shadow-lg cursor-pointer"
                            onClick={
                                () => {
                                    setSelectedPrescription(prescription)
                                    setMedication(prescription.medication)
                                    setDosage(prescription.dosage)
                                    setInstructions(prescription.instructions)
                                    setRefills(prescription.refills)
                                    setRefillDate(new Date(prescription.refillDate).toISOString().split('T')[0])

                                }
                            }>
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

                    {errorMessage && (
                        <p className="text-red-500 text-center error-message">
                            {errorMessage}
                        </p>
                    )}
                    {successMessage && (
                        <p className="text-green-500 text-center success-message">
                            {successMessage}
                        </p>
                    )}
                    <form onSubmit={selectedPrescription ? handleUpdatePrescription : handleCreatePrescription}>
                        <label htmlFor="medication" className="block text-gray-500 font-semibold mt-4">Medication</label>
                        <input
                            id="medication"
                            type="text"
                            value={medication}
                            onChange={(e) => setMedication(e.target.value)}
                            className="border-gray-300 text-gray-500 text-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 rounded-md shadow-sm"
                            required
                        />

                        <label htmlFor="dosage" className="block text-gray-500 font-semibold mt-4">Dosage</label>
                        <input
                            id="dosage"
                            type="text"
                            value={dosage}
                            onChange={(e) => setDosage(e.target.value)}
                            className="border-gray-300 text-gray-500 text-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 rounded-md shadow-sm"
                            required
                        />

                        <label htmlFor="instructions" className="block text-gray-500 font-semibold mt-4">Instructions</label>
                        <textarea
                            id="instructions"
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            className="border-gray-300 text-gray-500 text-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 rounded-md shadow-sm"
                            required
                        />

                        <label htmlFor="refills" className="block text-gray-500 font-semibold mt-4">Refills</label>
                        <input
                            id="refills"
                            type="number"
                            value={refills}
                            onChange={(e) => setRefills(Number(e.target.value))}
                            className="border-gray-300 text-gray-500 text-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 rounded-md shadow-sm"
                            required
                        />

                        <label htmlFor="refillDate" className="block text-gray-500 font-semibold mt-4">Next Refill Date</label>
                        <input
                            id="refillDate"
                            type="date"
                            value={refillDate}
                            onChange={(e) => setRefillDate(e.target.value)}
                            className="border-gray-300 text-gray-500 text-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 rounded-md shadow-sm"
                            required
                        />
                        {!selectedPrescription ?
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md">
                                Create Prescription
                            </button>
                            :
                            <div className="flex justify-between">
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md">
                                    Update Prescription
                                </button>
                                <button type="submit"
                                    onClick={handleDeletePrescription}
                                    className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md">
                                    Delete Prescription
                                </button>
                            </div>
                        }
                    </form>
                </div>
                {/* form for prescription */}
            </div>
        </div >
    )
}

export default DoctorPrescriptions;