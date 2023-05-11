const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
    max: 8,
  },
  notes: {
    type: String,
    trim: true,
    maxlength: 1000,
  },
});

module.exports = mongoose.model('Consultation', consultationSchema);
