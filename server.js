require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const app = require('./app');

// Подключение к MongoDB
connectDB();

// Инициализация приложения
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
