const express = require('express');
const { registerUser, loginUser, getProtectedRoute, logoutUser } = require('../controllers/authController');
const verifyToken = require('../middlewares/authMiddleware');
const validateRegister = require("../validators/registerValidator");
const router = express.Router();

// Регистрация пользователя
router.post('/register', validateRegister, registerUser);

// Вход пользователя
router.post('/login', loginUser);

// Разлогинивание пользователя
router.post('/logout', verifyToken, logoutUser);

// Защищенный маршрут
router.get('/protected', verifyToken, getProtectedRoute);

module.exports = router;
