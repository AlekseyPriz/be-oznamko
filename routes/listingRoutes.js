const express = require('express');
const { getListings, createListing, getListingById } = require('../controllers/listingController');
const { validateListing } = require('../validators/listingValidator');
const validateId = require('../middlewares/validateId');
const router = express.Router();

router.get('/', getListings);
router.get('/:id', validateId, getListingById);
router.post('/', validateListing, createListing);

module.exports = router;
