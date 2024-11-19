const express = require('express');
const admin = require('../config/firebase');
const verifyToken = require("../middlewares/authMiddleware");
const router = express.Router();

// Регистрация пользователя
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
        });
        res.status(201).json({ message: 'User created successfully', userRecord });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { token } = req.body;

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        res.status(200).json({ message: 'Login successful', uid: decodedToken.uid });
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});


module.exports = router;
