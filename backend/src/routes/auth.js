const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Account = require('../models/Account');
const Patient = require('../models/Patient');
const passportJwt = require('../config/passport');

router.post('/register', async (req, res, next) => {
    try {
        const { email, password, firstName, lastName, dateOfBirth, gender, weight, height, phone, address } = req.body;

        // Check if all fields are provided
        if (!email || !password || !firstName || !lastName || !dateOfBirth || !gender || !phone || !address || !weight || !height) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if email already exists
        const existingAccount = await Account.findOne({ email });
        if (existingAccount) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new Patient
        const patient = new Patient({
            firstName,
            lastName,
            dateOfBirth,
            gender,
            phone,
            address,
            weight,
            height
        });

        await patient.save();

        // Create a new Account associated with the patient
        const account = new Account({
            email,
            password: hashedPassword,
            isDoctor: false,
            patient: patient._id
        });
        
        await account.save();

        // Generate JWT token and send it back to the client
        const token = jwt.sign({ sub: account._id }, process.env.JWT_SECRET);
        res.status(201).json({ token });

    } catch (err) {
        next(err);
    }
});


router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if account exists
        const account = await Account.findOne({ email });
        if (!account) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, account.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token and send it back to the client
        const token = jwt.sign({ sub: account._id }, process.env.JWT_SECRET);
        res.status(200).json({ token });
    } catch (err) {
        next(err);
    }
});

router.get('/me', passportJwt, (req, res) => {
    res.json(req.user);
});

module.exports = router;

