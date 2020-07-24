const Joi = require('@hapi/joi');

const { SupervisorRole, ProjectManagerRole, TeamLeadRole, TeamMemberRole } = require('../enums/roles');
const { join } = require('lodash');

// Register
const registerValidation = Joi.object({
    firstName: Joi.string().max(100).required().trim(),
    lastName: Joi.string().max(100).required().trim(),
    email: Joi.string().email().max(255).required().trim(),
    password: Joi.string().min(6).max(255).required().trim().equal(Joi.ref('reEnterPassword')),
    reEnterPassword: Joi.string().min(6).max(255).required().trim(),
    role: Joi.string().valid(SupervisorRole, ProjectManagerRole, TeamLeadRole, TeamMemberRole).max(50).required().trim()
}).options({
    abortEarly: false
});

// Login
const loginValidation = Joi.object({
    email: Joi.string().email().max(255).required().trim(),
    password: Joi.string().min(6).max(255).required().trim(),
}).options({
    abortEarly: false
});

// Logout
const revokeTokenValidations = Joi.object({
    token: Joi.string().empty('')
}).options({
    abortEarly: false
});

// Change Password
const changePasswordValidations = Joi.object({
    oldPassword: Joi.string().min(6).max(255).required().trim(),
    newPassword: Joi.string().min(6).max(255).required().trim().equal(Joi.ref('reEnterPassword')),
    reEnterPassword: Joi.string().min(6).max(255).required().trim(),
}).options({
    abortEarly: false
});

// Profile 
const profileValidations = Joi.object({
    firstName: Joi.string().max(100).required().trim(),
    lastName: Joi.string().max(100).required().trim(),
    dob: Joi.date().label("Date of Birth"),
    email: Joi.string().email().max(255).required().trim(),
    mobile: Joi.string().max(11).trim(),
    address: Joi.string().max(255).trim(),
    experience: Joi.string().max(5000).trim(),
    tempPhotoId: Joi.string().max(255).trim()
}).options({
    abortEarly: false
});

// Forget Password 
const forgetPasswordValidations = Joi.object({
    email: Joi.string().email().max(255).required().trim()
}).options({
    abortEarly: false
});

// Reset Password 
const resetPasswordValidations = Joi.object({
    newPassword: Joi.string().min(6).max(255).required().trim().equal(Joi.ref('reEnterPassword')),
    reEnterPassword: Joi.string().min(6).max(255).required().trim(),
    token: Joi.string().required("Invalid request").trim(),
}).options({
    abortEarly: false
});

module.exports = {
    loginValidation,
    profileValidations,
    registerValidation,
    revokeTokenValidations,
    resetPasswordValidations,
    forgetPasswordValidations,
    changePasswordValidations
};