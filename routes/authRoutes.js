const express = require('express');
const { registerUser, loginUser, getProtectedRoute } = require('../controllers/authController');
const verifyToken = require('../middlewares/authMiddleware');
const router = express.Router();

// Регистрация пользователя
router.post('/register', registerUser);

// Вход пользователя
router.post('/login', loginUser);

// Защищенный маршрут
router.get('/protected', verifyToken, getProtectedRoute);

module.exports = router;
