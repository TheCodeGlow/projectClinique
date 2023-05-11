const express = require('express');
const router = express.Router();
const MedicalRecord = require('../models/MedicalRecord');
const passportJwt = require('../config/passport');

// GET endpoint to retrieve a patient's medical records by their ID
router.get('/patients/:id/records', passportJwt, async (req, res, next) => {
  try {
    const records = await MedicalRecord.find({ patient: req.params.id });
    res.json(records);
  } catch (err) {
    next(err);
  }
});

// PUT endpoint to update a patient's medical records by their ID
router.put('/patients/:id/records', passportJwt, async (req, res, next) => {
  try {
    const updatedRecord = await MedicalRecord.findOneAndUpdate(
      { _id: req.body.recordId, patient: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!updatedRecord) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json(updatedRecord);
  } catch (err) {
    next(err);
  }
});

// POST endpoint to create a new medical record for a patient by their ID
router.post('/patients/:id/records', passportJwt, async (req, res, next) => {
  try {
    const record = new MedicalRecord({ ...req.body, patient: req.params.id });
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    next(err);
  }
});

// DELETE endpoint to delete a specific medical record for a patient by their ID and record ID
router.delete('/patients/:id/records/:record_id', passportJwt, async (req, res, next) => {
  try {
    const deletedRecord = await MedicalRecord.findOneAndDelete({ _id: req.params.record_id, patient: req.params.id });
    if (!deletedRecord) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json({ message: 'Record deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
