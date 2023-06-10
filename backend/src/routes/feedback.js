const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const passportJwt = require('../config/passport');

// GET all feedback
router.get('/feedback', passportJwt, async (req, res, next) => {
  try {
    const feedback = await Feedback.find();
    res.json(feedback);
  } catch (err) {
    next(err);
  }
});
//get the average rating of a doctor
router.get('/feedback/average/:id', passportJwt, async (req, res, next) => {
  try {
    const feedback = await Feedback.find({ doctor: req.params.id });
    let sum = 0;
    for (let i = 0; i < feedback.length; i++) {
      sum += feedback[i].rating;
    }
    let average = sum / feedback.length;
    res.json(average);
  } catch (err) {
    next(err);
  }
});

// GET feedback by doctor ID
router.get('/feedback/:id', passportJwt, async (req, res, next) => {
  try {
    const feedback = await Feedback.find({ doctor: req.params.id });
    res.json(feedback);
  } catch (err) {
    next(err);
  }
});

// POST new feedback
router.post('/feedback', passportJwt, async (req, res, next) => {
  try {
    const { title, content, rating, patient, doctor } = req.body;
    const feedback = new Feedback({ title, content, rating, patient, doctor });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    next(err);
  }
});

// PUT update feedback by ID
router.put('/feedback/:id', passportJwt, async (req, res, next) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.json(feedback);
  } catch (err) {
    next(err);
  }
});

// DELETE feedback by ID
router.delete('/feedback/:id', passportJwt, async (req, res, next) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
