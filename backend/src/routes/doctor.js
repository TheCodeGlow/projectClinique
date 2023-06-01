const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const passportJwt = require('../config/passport');

router.get('/doctors/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    res.json(doctor);
  } catch (err) {
    next(err);
  }
});

router.get('/doctors', async (req, res, next) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    next(err);
  }
});

router.post('/doctors', passportJwt, async (req, res, next) => {
  try {
    const { firstName, lastName, specialty } = req.body;

    // Check if all fields are provided
    if (!firstName || !lastName || !specialty) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new Doctor
    const doctor = new Doctor({ firstName, lastName, specialty });
    await doctor.save();

    res.status(201).json(doctor);
  } catch (err) {
    next(err);
  }
});

router.put('/doctors/:id', passportJwt, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, specialty } = req.body;

    // Check if all fields are provided
    if (!firstName || !lastName || !specialty) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Update the Doctor
    const doctor = await Doctor.findByIdAndUpdate(id, { firstName, lastName, specialty }, { new: true });

    // Check if the Doctor exists
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.json(doctor);
  } catch (err) {
    next(err);
  }
});

router.delete('/doctors/:id', passportJwt, async (req, res, next) => {
  try {
    const { id } = req.params;

    // Delete the Doctor
    const doctor = await Doctor.findByIdAndDelete(id);

    // Check if the Doctor exists
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
