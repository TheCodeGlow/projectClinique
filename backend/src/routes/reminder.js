const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passportJwt = require('../config/passport');
const Reminder = require('../models/Reminder');

// GET /patients/{id}/reminders
router.get('/:id/reminders', passportJwt, async (req, res, next) => {
    try {
        const reminders = await Reminder.find({ patient: req.params.id });
        res.json(reminders);
    } catch (err) {
        next(err);
    }
});

// POST /patients/{id}/reminders
router.post('/:id/reminders', passportJwt, async (req, res, next) => {
    try {
        const { reminderType, title, description, date, time } = req.body;
        const reminder = new Reminder({
            patient: req.params.id,
            reminderType,
            title,
            description,
            date,
            time
        });
        await reminder.save();
        res.status(201).json(reminder);
    } catch (err) {
        next(err);
    }
});

// PUT /patients/{id}/reminders/{reminder_id}
router.put('/:id/reminders/:reminder_id', passportJwt, async (req, res, next) => {
    try {
        const { reminderType, title, description, date, time, isCompleted } = req.body;
        const reminder = await Reminder.findOneAndUpdate(
            { _id: req.params.reminder_id, patient: req.params.id },
            { reminderType, title, description, date, time, isCompleted },
            { new: true }
        );
        if (!reminder) {
            return res.status(404).json({ error: 'Reminder not found' });
        }
        res.json(reminder);
    } catch (err) {
        next(err);
    }
});

// DELETE /patients/{id}/reminders/{reminder_id}
router.delete('/:id/reminders/:reminder_id', passportJwt, async (req, res, next) => {
    try {
        const reminder = await Reminder.findOneAndDelete({ _id: req.params.reminder_id, patient: req.params.id });
        if (!reminder) {
            return res.status(404).json({ error: 'Reminder not found' });
        }
        res.json({ message: 'Reminder deleted successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
