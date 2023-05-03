const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Account = require('../models/Account');
const passportJwt = require('../config/passport');

router.post('/register', async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if all fields are provided
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if email already exists
        const existingAccount = await Account.findOne({ email });
        if (existingAccount) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new Account
        const account = new Account({ firstName, lastName, email, password: hashedPassword });
        await account.save();

        // Generate JWT token and send it back to the client
        const token = jwt.sign({ sub: account._id }, process.env.JWT_SECRET);
        res.status(201).json({ token });

    } catch (err) {
        next(err);
    }
});

router.post('/login', async (req, res, next) => {
    passportJwt(req, res, async (err) => {
        if (err) {
            return next(err);
        }
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
});

router.get('/me', passportJwt, (req, res) => {
    res.json(req.user);
});

module.exports = router;

