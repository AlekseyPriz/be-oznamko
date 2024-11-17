const Listing = require('../models/Listing');

exports.getListings = async (req, res, next) => {
    try {
        const listings = await Listing.find().populate('category');
        res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
};

exports.getListingById = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id).populate('category');
        if (!listing) return res.status(404).json({ message: 'Listing not found' });
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};

exports.createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
};
