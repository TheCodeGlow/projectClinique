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

// Use API routes
app.use('/api/auth', authRoutes);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
