const Joi = require('@hapi/joi');
// Add
const addValidation = Joi.object({
    name: Joi.string().max(100).required().trim(),
    location: Joi.string().max(100).required().trim(),
    model: Joi.string().max(100).required().trim(),
    // email: Joi.string().email().max(255).required().trim(),
    // password: Joi.string().min(6).max(255).required().trim().equal(Joi.ref('reEnterPassword')),
    // reEnterPassword: Joi.string().min(6).max(255).required().trim(),
    // role: Joi.string().valid(SuperviorRole, EngineerRole, MemberRole).max(50).required().trim()
}).options({
    abortEarly: false
});

module.exports = {
    addValidation,
};