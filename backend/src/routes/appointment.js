const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const passportJwt = require('../config/passport');

// GET /appointments
router.get('/', passportJwt, async (req, res, next) => {
  try {
    const appointments = await Appointment.find({});
    res.json(appointments);
  } catch (err) {
    next(err);
  }
});

// POST /appointments
router.post('/', passportJwt, async (req, res, next) => {
  try {
    const { doctor, patient, startTime, endTime, details } = req.body;
    console.log("Appointment request body: ",req.body);

    // Check if all fields are provided
    if (!doctor || !patient || !startTime || !endTime || !details) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new Appointment
    const appointment = new Appointment({ doctor, patient, startTime, endTime, details });
    await appointment.save();

    res.status(201).json(appointment);
  } catch (err) {
    next(err);
  }
});

// PUT /appointments/:id
router.put('/:id', passportJwt, async (req, res, next) => {
  try {
    const { doctor, patient, date, details } = req.body;

    // Find the appointment by ID
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // Update the appointment fields
    appointment.doctor = doctor || appointment.doctor;
    appointment.patient = patient || appointment.patient;
    appointment.date = date || appointment.date;
    appointment.details = details || appointment.details;

    await appointment.save();

    res.json(appointment);
  } catch (err) {
    next(err);
  }
});

// DELETE /appointments/:id
router.delete('/:id', passportJwt, async (req, res, next) => {
  try {
    // Find the appointment by ID and delete it
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
