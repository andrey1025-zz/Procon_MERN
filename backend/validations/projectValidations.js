const Joi = require('@hapi/joi');
// Add
const addValidation = Joi.object({
    name: Joi.string().max(100).required().trim(),
    location: Joi.string().max(100).required().trim(),
    model: Joi.object().required(),
    coverImage: Joi.object().required()
}).options({
    abortEarly: false
});

module.exports = {
    addValidation,
};