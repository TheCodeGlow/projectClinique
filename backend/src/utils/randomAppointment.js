const { faker } = require('@faker-js/faker');
const { random } = require('lodash');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const { DateTime } = require('luxon');

// Existing doctor IDs and patient IDs by axios.get
async function getDoctorIds() {
    const doctors = await Doctor.find();
    return doctors.map((doctor) => doctor._id.toString());
}

async function getPatientIds() {
    const patients = await Patient.find();
    return patients.map((patient) => patient._id.toString());
}

async function generateAppointment() {
    const startTime = faker.date.between({ from: '-1y', to: '+1y' });
    const duration = random(1, 2); // Generate random duration between 1 and 2 hours
    const endTime = DateTime.fromJSDate(startTime).plus({ hours: duration }).toJSDate();

    const doctorIds = await getDoctorIds();
    const patientIds = await getPatientIds();

    const randomDoctorIndex = random(0, doctorIds.length - 1);
    const randomPatientIndex = random(0, patientIds.length - 1);

    return {
        doctor: doctorIds[randomDoctorIndex], // Randomly select a doctor ID
        patient: patientIds[randomPatientIndex], // Randomly select a patient ID
        startTime,
        endTime,
        details: faker.lorem.sentence(), // Generate random reason
    };
}

const generate = async () => {
    for (let i = 0; i < 10; i++) {
        const randomAppointment = await generateAppointment();
        await Appointment.create(randomAppointment);
        console.log(randomAppointment);
    }
};

module.exports = generate;
