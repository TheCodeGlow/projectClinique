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

// GET feedback by ID
router.get('/feedback/:id', passportJwt, async (req, res, next) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.json(feedback);
  } catch (err) {
    next(err);
  }
});

// POST new feedback
router.post('/feedback', passportJwt, async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const feedback = new Feedback({ title, content });
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
