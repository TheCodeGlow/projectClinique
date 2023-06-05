// Prescription Schema
// patient: (ObjectId, ref: 'Patient', required) reference to the patient associated with the prescription
// date: (Date, required) date of the prescription
// medication: (String, required) name of the medication prescribed
// dosage: (String, required) dosage of the medication prescribed
// instructions: (String, required) instructions for taking the medication prescribed
// refills: (Number, required) number of refills of the prescription
// refillDate: (Date, required) date of the next refill of the prescription

const { faker } = require('@faker-js/faker');
const axios = require('axios');
const { random } = require('lodash');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Prescription = require('../models/Prescription');

// Existing doctor IDs and patient IDs by axios.get
async function getDoctorIds() {
    const doctors = await Doctor.find();
    return doctors.map((doctor) => doctor._id.toString());
}

async function getPatientIds() {
    const patients = await Patient.find();
    return patients.map((patient) => patient._id.toString());
}

function generateRandomPrescription() {
    const dosages = ['1 pill', '2 pills', '3 pills', '4 pills', '5 pills'];
    const instructions = ['once a day', 'twice a day', 'three times a day', 'four times a day', 'five times a day'];
    const refills = [1, 2, 3, 4, 5];
    const medication = ['Advil', 'Tylenol', 'Aspirin', 'Ibuprofen', 'Naproxen'];

    const randomDosageIndex = random(0, dosages.length - 1)
    const randomInstructionsIndex = random(0, instructions.length - 1);
    const randomRefillsIndex = random(0, refills.length - 1);
    const randomMedicationIndex = random(0, medication.length - 1);

    return {
        date: faker.date.between({ from: '-1y', to: '+1y' }),
        medication: medication[randomMedicationIndex],
        dosage: dosages[randomDosageIndex],
        instructions: instructions[randomInstructionsIndex],
        refills: refills[randomRefillsIndex],
        refillDate: faker.date.between({ from: '-1y', to: '+1y' }),
    };

}

async function generate() {
    const doctorIds = await getDoctorIds();
    const patientIds = await getPatientIds();

    for (let i = 0; i < 10; i++) {
        const randomPrescription = generateRandomPrescription();
        const randomDoctorIndex = random(0, doctorIds.length - 1);
        const randomPatientIndex = random(0, patientIds.length - 1);

        randomPrescription.doctor = doctorIds[randomDoctorIndex];
        randomPrescription.patient = patientIds[randomPatientIndex];

        await Prescription.create(randomPrescription);
        
    }
}

module.exports = { generate };


