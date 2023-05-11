const express = require('express');
const router = express.Router();
const Consultation = require('../models/Consultation');
const passportJwt = require('../config/passport');

// GET /consultations
router.get('/', passportJwt, async (req, res, next) => {
  try {
    const consultations = await Consultation.find({});
    res.json(consultations);
  } catch (err) {
    next(err);
  }
});

// POST /consultations
router.post('/', passportJwt, async (req, res, next) => {
  try {
    const { date, duration, notes } = req.body;

    // Check if all fields are provided
    if (!date || !duration) {
      return res.status(400).json({ error: 'Date and duration are required' });
    }

    // Create a new Consultation
    const consultation = new Consultation({ date, duration, notes });
    await consultation.save();

    res.status(201).json(consultation);
  } catch (err) {
    next(err);
  }
});

// PUT /consultations/:id
router.put('/:id', passportJwt, async (req, res, next) => {
  try {
    const { date, duration, notes } = req.body;

    // Find the consultation by ID
    const consultation = await Consultation.findById(req.params.id);
    if (!consultation) {
      return res.status(404).json({ error: 'Consultation not found' });
    }

    // Update the consultation fields
    consultation.date = date || consultation.date;
    consultation.duration = duration || consultation.duration;
    consultation.notes = notes || consultation.notes;

    await consultation.save();

    res.json(consultation);
  } catch (err) {
    next(err);
  }
});

// DELETE /consultations/:id
router.delete('/:id', passportJwt, async (req, res, next) => {
  try {
    // Find the consultation by ID and delete it
    const consultation = await Consultation.findByIdAndDelete(req.params.id);
    if (!consultation) {
      return res.status(404).json({ error: 'Consultation not found' });
    }

    res.json(consultation);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
