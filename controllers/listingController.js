const Listing = require('../models/Listing');

// Получить все объявления
exports.getListings = async (req, res, next) => {
    try {
        const listings = await Listing.find();
        res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
};

// Получить объявление по ID
exports.getListingById = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' });
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};

// Создать новое объявление
exports.createListing = async (req, res, next) => {
    try {
        const newListing = new Listing(req.body);
        await newListing.save();
        res.status(201).json(newListing);
    } catch (error) {
        next(error);
    }
};

// Обновить объявление по ID
exports.updateListing = async (req, res, next) => {
    try {
        const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' });
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};

// Удалить объявление по ID
exports.deleteListing = async (req, res, next) => {
    try {
        const listing = await Listing.findByIdAndDelete(req.params.id);
        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' });
        }
        res.status(200).json({ message: 'Listing deleted successfully' });
    } catch (error) {
        next(error);
    }
};
