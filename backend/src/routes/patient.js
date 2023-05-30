const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const passportJwt = require('../config/passport');

// TODO: Do the same for patients
// Get list of patients for a specific doctor
router.get('/patients', passportJwt, async (req, res, next) => {
    try {
        const doctorId = req.query.doctorId;
        let patients = [];

        if (doctorId) {
            const appointments = await Appointment.find({ doctor: doctorId });
            patients = await Patient.find({ _id: { $in: appointments.map(appointment => appointment.patient) } });
        } else {
            // if no doctorId is provided, return all patients
            patients = await Patient.find();
        }

        res.json(patients);
    } catch (err) {
        next(err);
    }
});

// Create a new patient
router.post('/patients', passportJwt, async (req, res, next) => {
    try {
        const { firstName, lastName, dateOfBirth, gender, phone, address } = req.body;

        // Check if all fields are provided
        if (!firstName || !lastName || !dateOfBirth || !phone  || !gender || !address) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create a new patient
        const patient = new Patient({ firstName, lastName, dateOfBirth, gender, phone, address });
        await patient.save();

        res.status(201).json(patient);
    } catch (err) {
        next(err);
    }
});

// Update an existing patient by their ID
router.put('/patients/:id', passportJwt, async (req, res, next) => {
    try {
        const { name, age, gender, address } = req.body;

        // Check if all fields are provided
        if (!name || !age || !gender || !address) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const patient = await Patient.findByIdAndUpdate(req.params.id, { name, age, gender, address }, { new: true });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        res.json(patient);
    } catch (err) {
        next(err);
    }
});

// Delete an existing patient by their ID
router.delete('/patients/:id', passportJwt, async (req, res, next) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        res.json({ message: 'Patient deleted successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
