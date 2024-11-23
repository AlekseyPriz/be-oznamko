const admin = require('../config/firebase');

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);

        // Получаем информацию о пользователе из Firebase Admin SDK
        const user = await admin.auth().getUser(decodedToken.uid);

        // Проверяем, был ли токен выдан после последней аннуляции
        const tokensValidAfterTime = new Date(user.tokensValidAfterTime).getTime();
        const authTime = decodedToken.auth_time * 1000;

        if (authTime < tokensValidAfterTime) {
            return res.status(401).json({ error: 'Token has been revoked' });
        }

        req.user = decodedToken; // Добавляем данные о пользователе в запрос
        next();
    } catch (error) {
        console.error('Error verifying token:', error.message);
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = verifyToken;
