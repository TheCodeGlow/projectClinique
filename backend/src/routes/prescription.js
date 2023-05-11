const express = require('express');
const router = express.Router();
const Prescription = require('../models/Prescription');
const passportJwt = require('../config/passport');

// Get a patient's prescriptions
router.get('/patients/:id/prescriptions', passportJwt, async (req, res, next) => {
  try {
    const prescriptions = await Prescription.find({ patient: req.params.id });
    res.json(prescriptions);
  } catch (err) {
    next(err);
  }
});

// Create a new prescription for a patient
router.post('/patients/:id/prescriptions', passportJwt, async (req, res, next) => {
  try {
    const prescription = new Prescription({ ...req.body, patient: req.params.id });
    await prescription.save();
    res.status(201).json(prescription);
  } catch (err) {
    next(err);
  }
});

// Update a prescription for a patient
router.put('/patients/:id/prescriptions/:prescription_id', passportJwt, async (req, res, next) => {
  try {
    const updatedPrescription = await Prescription.findOneAndUpdate(
      { _id: req.params.prescription_id, patient: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!updatedPrescription) {
      return res.status(404).json({ error: 'Prescription not found' });
    }
    res.json(updatedPrescription);
  } catch (err) {
    next(err);
  }
});

// Delete a prescription for a patient
router.delete('/patients/:id/prescriptions/:prescription_id', passportJwt, async (req, res, next) => {
  try {
    const deletedPrescription = await Prescription.findOneAndDelete({ _id: req.params.prescription_id, patient: req.params.id });
    if (!deletedPrescription) {
      return res.status(404).json({ error: 'Prescription not found' });
    }
    res.json({ message: 'Prescription deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
