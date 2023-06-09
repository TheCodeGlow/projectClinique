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
  profilePicture : {
    type: String,
    required: true,
    default: "patient.jpg"
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
  weight: {
    type: Number,
    required: true,
    default: 60 
  },
  height: {
    type: Number,
    required: true,
    default: 170,
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
