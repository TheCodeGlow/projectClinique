const mongoose = require('mongoose');

const healthDataSchema = new mongoose.Schema({
patient: {
type: mongoose.Schema.Types.ObjectId,
ref: 'Patient',
required: true
},
date: {
type: Date,
required: true
},
type: {
type: String,
enum: ['steps', 'sleep', 'heartRate', 'bloodPressure'],
required: true
},
value: {
type: Number,
required: true
}
});

const HealthData = mongoose.model('HealthData', healthDataSchema);

module.exports = HealthData;