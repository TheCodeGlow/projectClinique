const express = require('express');
const router = express.Router();
const HealthData = require('../models/Health');
const passportJwt = require('../config/passport');

// GET /patients/{id}/health-data
router.get('/patients/:id/health-data', passportJwt, async (req, res, next) => {
  try {
    const healthData = await HealthData.find({ patient: req.params.id }).populate('patient');
    res.json(healthData);
  } catch (err) {
    next(err);
  }
});

// POST /patients/{id}/health-data
router.post('/patients/:id/health-data', passportJwt, async (req, res, next) => {
  try {
    const { date, type, value } = req.body;

    // Create a new HealthData object
    const healthData = new HealthData({ patient: req.params.id, date, type, value });
    await healthData.save();

    res.status(201).json(healthData);
  } catch (err) {
    next(err);
  }
});

// PUT /patients/{id}/health-data/{data_id}
router.put('/patients/:id/health-data/:data_id', passportJwt, async (req, res, next) => {
  try {
    const { date, type, value } = req.body;

    // Find the health data by id and patient id
    const healthData = await HealthData.findOne({ _id: req.params.data_id, patient: req.params.id });
    if (!healthData) {
      return res.status(404).json({ error: 'Health data not found' });
    }

    // Update the health data
    healthData.date = date;
    healthData.type = type;
    healthData.value = value;
    await healthData.save();

    res.json(healthData);
  } catch (err) {
    next(err);
  }
});

// DELETE /patients/{id}/health-data/{data_id}
router.delete('/patients/:id/health-data/:data_id', passportJwt, async (req, res, next) => {
  try {
    // Find the health data by id and patient id
    const healthData = await HealthData.findOne({ _id: req.params.data_id, patient: req.params.id });
    if (!healthData) {
      return res.status(404).json({ error: 'Health data not found' });
    }

    // Delete the health data
    await healthData.remove();

    res.json({ message: 'Health data deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;