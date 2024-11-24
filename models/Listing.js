const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrls: [{ type: String }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    owner: { type: String, required: true }, // UID из Firebase
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Listing', listingSchema);
