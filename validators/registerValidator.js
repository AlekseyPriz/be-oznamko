const Joi = require('joi');

// Определяем схему для валидации
const registerSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format',
        'string.empty': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'string.empty': 'Password is required',
    }),
    displayName: Joi.string().messages({
        'string.base': 'Display name must be a string',
    }),
    phoneNumber: Joi.string()
        .regex(/^\+?[1-9]\d{1,14}$/) // Международный формат, максимум 15 цифр
        .messages({
            'string.pattern.base': 'Phone number must be in international format and up to 15 digits',
        }),
    termsAccepted: Joi.boolean().valid(true).required().messages({
        'any.only': 'You must accept the terms and conditions',
    }),
});

// Middleware для проверки данных
const validateRegister = (req, res, next) => {
    const { error } = registerSchema.validate(req.body, { abortEarly: false }); // Проверка всей схемы
    if (error) {
        console.log('validateRegister error =>', error);
        const errorMessages = error.details.map((detail) => detail.message); // Сбор всех ошибок
        return res.status(400).json({ errors: errorMessages });
    }
    next();
};

module.exports = validateRegister;
