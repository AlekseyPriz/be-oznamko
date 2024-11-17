const rateLimit = require('express-rate-limit');

// Настройка ограничений на количество запросов
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000, // Период в миллисекундах
    max: parseInt(process.env.RATE_LIMIT_MAX || 100), // Максимальное количество запросов за период
    message: "Too many requests, please try again later.", // Сообщение при превышении лимита
});

module.exports = limiter;
