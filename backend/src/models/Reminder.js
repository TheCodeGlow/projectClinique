const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    reminderType: {
        type: String,
        enum: ['appointment', 'medication', 'other'],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;