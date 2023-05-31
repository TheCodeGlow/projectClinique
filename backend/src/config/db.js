const mongoose = require('mongoose');
const path = require('path');
// Certificate for MongoDB connection
const certificate = '../certs/devCA.pem';

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            sslKey: path.join(__dirname,certificate),
            sslCert: path.join(__dirname,certificate),
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(-1);
    }
}

module.exports = { connect };
