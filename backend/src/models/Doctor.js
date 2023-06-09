const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: "No bio available."
  },
  specialty: {
    type: String,
    required: true,
    default: "General Practitioner"
  },
  profilePicture: {
    type: String,
    required: true,
    default: "doctor.jpg"
  },
  degree: {
    type: String,
    default: "MD"
  },
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  }]
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
