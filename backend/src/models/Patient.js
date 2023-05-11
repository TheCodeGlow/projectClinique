const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  }],
  reminders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reminder'
  }],
  healthData: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HealthData'
  }]
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
