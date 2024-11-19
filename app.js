const express = require('express');
const helmet = require('helmet');
const categoryRoutes = require('./routes/categoryRoutes');
const listingRoutes = require('./routes/listingRoutes');
const errorHandler = require('./middlewares/errorHandler');
const limiter = require('./middlewares/requestLimiter');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(limiter);

// Роуты
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/listings', listingRoutes);

// Обработка ошибок
app.use(errorHandler);

module.exports = app;
