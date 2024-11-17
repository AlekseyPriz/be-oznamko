const express = require('express');
const { getListings, createListing, getListingById, updateListing, deleteListing } = require('../controllers/listingController');
const { validateListing } = require('../validators/listingValidator');
const validateId = require('../middlewares/validateId');
const router = express.Router();

// Получить все объявления
router.get('/', getListings);

// Получить объявление по ID
router.get('/:id', validateId, getListingById);

// Создать новое объявление
router.post('/', validateListing, createListing);

// Обновить объявление по ID
router.put('/:id', validateId, validateListing, updateListing);

// Удалить объявление по ID
router.delete('/:id', validateId, deleteListing);

module.exports = router;

