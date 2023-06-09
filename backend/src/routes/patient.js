const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const passportJwt = require('../config/passport');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../../client/public/uploads'));
    },
    filename: function (req, file, cb) {
        console.log("file.originalname " + file.originalname);
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });



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

// Get a specific patient by their ID
router.get('/patients/:id', passportJwt, async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        res.json(patient);
    } catch (err) {
        next(err);
    }
});

// Create a new patient
router.post('/patients', upload.single("profilePicture"), passportJwt, async (req, res, next) => {
    try {
        console.log("req.body " + JSON.stringify(req.body));
        const { firstName, lastName, dateOfBirth, gender, phone, address, weight, height } = req.body;
        const profilePicture = req.file ? req.file.filename : null;

        // Check if all fields are provided
        if (!firstName || !lastName || !dateOfBirth || !phone || !gender || !address || !weight || !height) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create a new patient
        const patient = new Patient({ firstName, lastName, dateOfBirth, gender, phone, address, weight, height, profilePicture });
        await patient.save();

        res.status(201).json(patient);
    } catch (err) {
        next(err);
    }
});

// Update an existing patient by their ID
router.put('/patients/:id', upload.single("profilePicture"), passportJwt, async (req, res, next) => {
    try {
        console.log("req.body " + JSON.stringify(req.body));
        const { firstName, lastName, dateOfBirth, gender, phone, address, weight, height } = req.body;
        const profilePicture = req.file ? req.file.filename : null;

        // Check if all fields are provided
        if (!firstName || !lastName || !dateOfBirth || !gender || !address || !phone || !weight || !height ) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const updatedPatient = { firstName, lastName, dateOfBirth, gender, phone, address, weight, height }
        if (profilePicture) {
            updatedPatient.profilePicture = profilePicture;
        }

        const patient = await Patient.findByIdAndUpdate(req.params.id, updatedPatient, { new: true });
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
