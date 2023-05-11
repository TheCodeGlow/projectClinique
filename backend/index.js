const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');

// Load environment variables from .env file
require('dotenv').config();

// Connect to MongoDB
const db = require('./src/config/db');
db.connect();

// Create Express app
const app = express();

// Set up middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());

// Define API routes
const authRoutes = require('./src/routes/auth');
const appointmentRoutes = require('./src/routes/appointment');
const consultationRoutes = require('./src/routes/consultation');
const doctorRoutes = require('./src/routes/doctor');
const feedbackRoutes = require('./src/routes/feedback');
const healthRoutes = require('./src/routes/health');
const patientRoutes = require('./src/routes/patient');
const prescriptionRoutes = require('./src/routes/prescription');
const recordRoutes = require('./src/routes/record');
const reminderRoutes = require('./src/routes/reminder');


// Use API routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/reminders', reminderRoutes);

// log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});



// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
