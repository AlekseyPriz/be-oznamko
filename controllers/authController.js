const axios = require('axios');
const admin = require('../config/firebase');

// Регистрация пользователя
const registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Создаем пользователя в Firebase
        const userRecord = await admin.auth().createUser({
            email,
            password,
        });

        // Возвращаем успешный ответ
        res.status(201).json({
            message: 'User created successfully',
            userRecord,
        });
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(400).json({ error: error.message });
    }
};

// Вход пользователя
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Логин пользователя через Firebase REST API
        const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`, {
            email,
            password,
            returnSecureToken: true,
        });

        // Возвращаем токен
        res.status(200).json({
            message: 'Login successful',
            token: response.data.idToken,
        });
    } catch (error) {
        console.error('Error logging in user:', error.message);
        res.status(401).json({ error: 'Invalid credentials' });
    }
};

// Защищенный маршрут
const getProtectedRoute = (req, res) => {
    res.status(200).json({
        message: 'This is a protected route',
        user: req.user,
    });
};

// Разлогинивание пользователя
const logoutUser = async (req, res) => {
    try {
        // Если хотите дополнительно работать с токенами (например, инвалидировать):
        const token = req.headers.authorization.split(' ')[1];
        console.log('req.user.uid =>', req.user.uid);
        await admin.auth().revokeRefreshTokens(req.user.uid);

        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        console.error('Error logging out user:', error.message);
        res.status(500).json({ error: 'Error logging out user' });
    }
};

module.exports = { registerUser, loginUser, getProtectedRoute, logoutUser };
