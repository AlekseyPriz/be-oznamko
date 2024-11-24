const Joi = require('joi');

exports.validateListing = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required().messages({
            'string.base': 'Title must be a string',
            'any.required': 'Title is required',
        }),
        description: Joi.string().required().messages({
            'string.base': 'Description must be a string',
            'any.required': 'Description is required',
        }),
        price: Joi.number().required().messages({
            'number.base': 'Price must be a number',
            'any.required': 'Price is required',
        }),
        imageUrls: Joi.array().items(Joi.string()).messages({
            'array.base': 'Image URLs must be an array of strings',
        }),
        category: Joi.string().required().messages({
            'string.base': 'Category must be a string',
            'any.required': 'Category is required',
        }),
        owner: Joi.string().required().messages({
            'string.base': 'Owner must be a string',
            'any.required': 'Owner is required',
        }),
        createdAt: Joi.date().iso().default(() => new Date().toISOString()).messages({
            'date.base': 'CreatedAt must be a valid date',
            'date.format': 'CreatedAt must be in ISO format',
        }),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({ errors: errorMessages });
    }
    next();
};
