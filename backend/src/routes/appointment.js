const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const passportJwt = require('../config/passport');

// Retrieves a list of available appointment slots
router.get('/appointments', passportJwt, async (req, res, next) => {
    try {
        const appointments = await Appointment.find({ isReserved: false });
        res.json(appointments);
    } catch (err) {
        next(err);
    }
});

// Reserves a new appointment
router.post('/appointments', passportJwt, async (req, res, next) => {
    try {
        const { date, time } = req.body;

        // Check if appointment slot is available
        const existingAppointment = await Appointment.findOne({ date, time, isReserved: false });
        if (!existingAppointment) {
            return res.status(409).json({ error: 'Appointment slot is not available' });
        }

        // Reserve the appointment slot
        existingAppointment.isReserved = true;
        existingAppointment.patient = req.user._id;
        await existingAppointment.save();

        res.status(201).json({ message: 'Appointment reserved successfully' });
    } catch (err) {
        next(err);
    }
});

// Updates an existing appointment by its ID
router.put('/appointments/:id', passportJwt, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { date, time } = req.body;

        // Check if appointment slot exists
        const existingAppointment = await Appointment.findById(id);
        if (!existingAppointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        // Check if appointment slot is already reserved
        if (existingAppointment.isReserved) {
            return res.status(409).json({ error: 'Appointment slot is already reserved' });
        }

        // Update the appointment slot
        existingAppointment.date = date;
        existingAppointment.time = time;
        await existingAppointment.save();

        res.json({ message: 'Appointment updated successfully' });
    } catch (err) {
        next(err);
    }
});

// Cancels an existing appointment by its ID
router.delete('/appointments/:id', passportJwt, async (req, res, next) => {
    try {
        const { id } = req.params;

        // Check if appointment slot exists
        const existingAppointment = await Appointment.findById(id);
        if (!existingAppointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        // Check if appointment slot is already cancelled
        if (!existingAppointment.isReserved) {
            return res.status(409).json({ error: 'Appointment slot is already cancelled' });
        }

        // Cancel the appointment slot
        existingAppointment.isReserved = false;
        existingAppointment.patient = null;
        await existingAppointment.save();

        res.json({ message: 'Appointment cancelled successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
