const cors = require('cors');

const allowedOrigins = ['http://localhost:4200']; // Домен вашего клиента

// Настройка CORS
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Разрешаем доступ
        } else {
            callback(new Error('Not allowed by CORS')); // Запрещаем доступ
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Разрешенные HTTP-методы
    allowedHeaders: ['Content-Type', 'Authorization'], // Разрешенные заголовки
    credentials: true, // Если требуется поддержка кук или заголовка Authorization
};

// Экспортируем middleware
const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
