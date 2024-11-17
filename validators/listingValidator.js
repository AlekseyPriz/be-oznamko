const Joi = require('joi');

exports.validateListing = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        images: Joi.array().items(Joi.string()),
        category: Joi.string().required(),
        owner: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
};
