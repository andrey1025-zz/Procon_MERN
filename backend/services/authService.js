const _ = require('lodash');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

const config = require('config');
const User = require('../models/userModel');
const TempFiles = require('../models/tempFilesModel');
const mailService = require('../services/mailService');
const responseStatus = require("../enums/responseStatus");
const RefreshToken = require("../models/refreshTokenModel");
const { basicDetails } = require('../services/helperService');
const RecoverPassword = require('../models/recoverPasswordModel');
const recoverPasswordModel = require('../models/recoverPasswordModel');
const saltRounds = 10;

// Register User
async function register({ firstName, lastName, email, password, role, ipAddress }) {
    email = email.toLowerCase();
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        // Check if email already register
        const user = await User.findOne({ email: email.toLowerCase() });
        if (user) {
            return {
                ...response,
                errorMessage: {
                    ...response.errorMessage,
                    email: "Email already registered"
                }
            };
        } else {
            // Create new user
            const hashedPassword = await bcrypt.hashSync(password, saltRounds);
            const user = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role
            });
            const session = await mongoose.startSession();
            try {
                const opts = { session, returnOriginal: false };
                await session.startTransaction();
                await RefreshToken.createCollection();
                await User.createCollection();
                await user.save(opts);
                const jwtToken = generateJwtToken(user);
                const refreshToken = generateRefreshToken(user, ipAddress);
                await refreshToken.save(opts);
                await session.commitTransaction();
                await session.endSession();
                return {
                    ...response,
                    status: responseStatus.success,
                    errorMessage: {},
                    token: jwtToken,
                    refreshToken: refreshToken.token,
                    user: basicDetails(user)
                };
            } catch (error) {
                await session.abortTransaction();
                await session.endSession();
                throw error;
            }
        }
    }
    catch (error) {
        throw error
    }
};

// Login 
async function login({ email, password, ipAddress }) {
    email = email.toLowerCase();
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    }
    try {
        const user = await User.findOne({ email });
        if (!user)
            return {
                ...response,
                errorMessage: {
                    ...response.errorMessage,
                    fatalError: "Email or password incorrect"
                }
            };
        if (user) {
            const passwordMatched = await bcrypt.compareSync(password, user.password);
            if (!passwordMatched) {
                return {
                    ...response,
                    errorMessage: {
                        ...response.errorMessage,
                        fatalError: "Email or password incorrect"
                    }
                };
            }
        }
        // Role based
        const session = await mongoose.startSession();
        const opts = { session, returnOriginal: false };
        try {
            //await session.startTransaction();
            const jwtToken = generateJwtToken(user);
            const refreshToken = generateRefreshToken(user, ipAddress);
            await refreshToken.save(opts);
            //await session.commitTransaction();
            await session.endSession();
            return {
                ...response,
                status: responseStatus.success,
                errorMessage: {},
                token: jwtToken,
                user: basicDetails(user),
                refreshToken: refreshToken.token
            };
        } catch (error) {
            await session.abortTransaction();
            await session.endSession();
            throw error;
        }
    } catch (error) {
        throw error;
    }
};

// Refresh Token
async function refreshToken({ token, ipAddress }) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const refreshToken = await RefreshToken.findOne({ token }).populate('user');
        if (!refreshToken || !refreshToken.isActive)
            return {
                ...response,
                errorMessage: {
                    ...response.errorMessage,
                    fatalError: "Invalid request",
                }
            };
        const { user } = refreshToken;
        // replace old refresh token with a new one and save
        const newRefreshToken = generateRefreshToken(user, ipAddress);
        refreshToken.revoked = Date.now();
        refreshToken.revokedByIp = ipAddress;
        refreshToken.replacedByToken = newRefreshToken.token;
        await refreshToken.save();
        await newRefreshToken.save();
        // generate new jwt
        const jwtToken = generateJwtToken(user);
        // return basic details and tokens
        return {
            ...response,
            status: responseStatus.success,
            errorMessage: {},
            user: basicDetails(user),
            token: jwtToken,
            refreshToken: newRefreshToken.token
        };
    } catch (error) {
        throw error;
    }
}

// Logout - Remove token
async function revokeToken({ token, ipAddress }) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const refreshToken = await RefreshToken.findOne({ token }).populate('user');
        if (!refreshToken || !refreshToken.isActive)
            return {
                ...response,
                errorMessage: {
                    ...response.errorMessage,
                    fatalError: "Invalid request"
                }
            };
        refreshToken.revoked = Date.now();
        refreshToken.revokedByIp = ipAddress;
        await refreshToken.save();
        return {
            ...response,
            status: responseStatus.success
        };
    } catch (error) {
        throw error
    }
}

// Change Password
async function changePassword({ userId, oldPassword, newPassword }) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const user = await User.findById(userId);
        if (user === null) {
            throw "Something went wrong"
        }
        const passwordMatched = await bcrypt.compareSync(oldPassword, user.password);
        if (!passwordMatched) {
            return {
                ...response,
                errorMessage: {
                    ...response.errorMessage,
                    oldPassword: "Old password incorrect"
                }
            };
        }
        const hashedPassword = await bcrypt.hashSync(newPassword, saltRounds);
        await user.updateOne({ password: hashedPassword });
        return {
            ...response,
            status: responseStatus.success
        };
    } catch (error) {
        throw error;
    }
};

// Update Profile
async function updateProfile({ userId, firstName, lastName, dob, email, mobile, address, experience, tempPhotoId }) {
    email = email.toLowerCase();
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const user = await User.findById(userId);
        if (user === null) {
            throw `User with id ${id} doesn't exist`
        }

        const dub = await User.findOne({ email });
        if (dub && dub._id.toString() !== userId)
            throw "Email already registered"
        var photoPath = user.photo;
        if (tempPhotoId) {
            const tempPhoto = await TempFiles.findById(tempPhotoId);
            if (tempPhoto)
                photoPath = tempPhoto.path;
            else
                throw "Photo id is invalid"
        } else
            photoPath = null;
        await user.updateOne({
            firstName: firstName,
            lastName: lastName,
            dob: dob,
            email: email,
            mobile: mobile,
            address: address,
            experience: experience,
            photo: photoPath
        });
        return {
            ...response,
            status: responseStatus.success,
            profile: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobile: mobile,
                dob: dob,
                address: address,
                experience: experience,
                photo: photoPath ? `${config.assetsBaseUrl}/${photoPath}` : null
            }
        };
    } catch (error) {
        throw error;
    }
};

// Update Profile
async function getUserProfile(userId) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const user = await User.findById(userId);
        if (user === null) {
            throw `User with id ${id} doesn't exist`
        }
        return {
            ...response,
            status: responseStatus.success,
            profile: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                mobile: user.mobile,
                dob: user.dob,
                address: user.address,
                experience: user.experience,
                photo: user.photo ? `${config.assetsBaseUrl}/${user.photo}` : null
            }
        };
    } catch (error) {
        throw error;
    }
};

// Update Profile
async function forgetPassword(email) {
    email = email.toLowerCase().trim();
    var response = {
        status: responseStatus.failure
    };
    try {
        const user = await User.findOne({ email });
        if (user === null) {
            return {
                ...response,
                status: responseStatus.success
            };
        }
        const recoverPasswordModel = await RecoverPassword.findOne({ email: email });
        if (recoverPasswordModel) {
            let lastTokenSendTime = Math.abs(new Date() - recoverPasswordModel.lastTokenSendTime);
            if (lastTokenSendTime >= 30000) {
                const token = recoverPasswordModel.token;
                const message = `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n Please click on the following link, or paste this into your browser to complete the process:\n\n${config.passwordResetLink}/${token}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.`;
                mailService.sendMail(email,
                    config.emailFrom,
                    "Procon - Reset Password",
                    message);
                const date = new Date();
                const expires = date.setMinutes(date.getMinutes() + 15);
                await recoverPasswordModel.updateOne({
                    tokenVerified: false,
                    lastTokenSendTime: new Date(),
                    expires: expires
                });
                return {
                    ...response,
                    status: responseStatus.success
                };
            } else {
                let interval = Math.floor((30000 - lastTokenSendTime) / 1000);
                return {
                    ...response,
                    errorMessage: {
                        ...response.errorMessage,
                        fatalError: `Password reset email send few seconds ago, please try again after ${interval}`
                    }
                };
            }
        } else {
            const user = await User.findOne({ email });
            if (user) {
                const token = randomTokenString();
                const date = new Date();
                const expires = date.setMinutes(date.getMinutes() + 15);
                const message = `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n Please click on the following link, or paste this into your browser to complete the process:\n\n${config.passwordResetLink}/${token}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.`;
                mailService.sendMail(email,
                    config.emailFrom,
                    "Procon - Reset Password",
                    message);
                const newRecoverPasswordModel = new RecoverPassword({
                    email: email,
                    token: token,
                    expires: expires
                });
                await newRecoverPasswordModel.save();
                return {
                    ...response,
                    status: responseStatus.success
                };
            } else {
                return {
                    ...response,
                    status: responseStatus.success
                };
            }
        }
    } catch (error) {
        throw error;
    }
};

// Change Password
async function resetPassword({ newPassword, reEnterPassword, token }) {
    var response = {
        status: responseStatus.failure
    };
    try {
        const recoverPassword = await RecoverPassword.findOne({ token });
        if (recoverPassword === null)
            throw "Invalid request"
        if (recoverPassword.tokenVerified || recoverPassword.isExpired)
            throw "Request expired,";
        const user = await User.findOne({ email: recoverPassword.email });
        const newHashPassword = await bcrypt.hashSync(newPassword, saltRounds);
        await user.updateOne({
            password: newHashPassword
        });
        await recoverPasswordModel.updateOne({
            tokenVerified: true
        });
        return {
            ...response,
            status: responseStatus.success
        };
    } catch (error) {
        throw error;
    }
};

//#region helper functions
function generateJwtToken(user) {
    return jwt.sign({ sub: user.id, id: user.id }, config.secret, { expiresIn: '15m' });
};

function generateRefreshToken(user, ipAddress) {
    // create a refresh token that expires in 7 days
    return new RefreshToken({
        user: user.id,
        token: randomTokenString(),
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdByIp: ipAddress
    });
};

function randomTokenString() {
    return crypto.randomBytes(40).toString('hex');
};
//#endregion

module.exports = {
    login,
    register,
    revokeToken,
    refreshToken,
    resetPassword,
    updateProfile,
    changePassword,
    getUserProfile,
    forgetPassword
};