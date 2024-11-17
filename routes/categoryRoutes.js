const express = require('express');
const { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { validateCategory } = require('../validators/categoryValidator');
const router = express.Router();

// Получить все категории
router.get('/', getCategories);

// Получить категорию по ID
router.get('/:id', getCategoryById);

// Создать новую категорию
router.post('/', validateCategory, createCategory);

// Обновить категорию по ID
router.put('/:id', validateCategory, updateCategory);

// Удалить категорию по ID
router.delete('/:id', deleteCategory);

module.exports = router;
