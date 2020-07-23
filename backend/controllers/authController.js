const _ = require('lodash');

const authService = require('../services/authService');
const photoService = require('../services/photoService');
const responseStatus = require('../enums/responseStatus');
const { setTokenCookie, parseCookies } = require('../services/helperService');

// Registeration
register = (req, res, next) => {
    const { firstName, lastName, email, password, role } = req.body;
    const ipAddress = req.ip;
    authService.register({ firstName, lastName, email, password, role, ipAddress })
        .then(response => {
            if (response.status === responseStatus.success)
                setTokenCookie(res, response.refreshToken);
            res.json(_.omit(response, 'refreshToken'));
        }).catch(next);
};

// Login
login = (req, res, next) => {
    const { email, password } = req.body;
    const ipAddress = req.ip;
    authService.login({ email, password, ipAddress })
        .then(response => {
            if (response.status === responseStatus.success)
                setTokenCookie(res, response.refreshToken);
            res.json(_.omit(response, 'refreshToken'));
        }).catch(next);
};

// Refresh Token
refreshToken = (req, res, next) => {
    const cookies = parseCookies(req);
    if (!cookies || !cookies.refreshToken)
        throw "Invalid token";
    const ipAddress = req.ip;
    authService.refreshToken({ token: cookies.refreshToken, ipAddress })
        .then(response => {
            if (response.status === responseStatus.success)
                setTokenCookie(res, response.refreshToken);
            res.json(_.omit(response, 'refreshToken'));
        }).catch(next);
};

// Logout
revokeToken = (req, res, next) => {
    const token = req.body.token || req.cookies.refreshToken;
    const ipAddress = req.ip;
    if (!req.user.ownsToken(token))
        return res.status(401);
    authService.revokeToken({ token, ipAddress })
        .then(response => {
            res.json(response)
        }).catch(next);
};

// Change Password
changePassword = (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const { sub: userId } = req.user;
    authService.changePassword({ userId, oldPassword, newPassword })
        .then(response => {
            res.json(response);
        }).catch(next);
};

// Update Profile
updateProfile = (req, res, next) => {
    const { firstName, lastName, dob, email, mobile, address, experience, tempPhotoId } = req.body;
    const { sub: userId } = req.user;
    authService.updateProfile({ userId, firstName, lastName, dob, email, mobile, address, experience, tempPhotoId })
        .then(response => {
            res.json(response);
        }).catch(next);
};

// Upload Profile Picture
uploadPhoto = (req, res, next) => {
    const file = req.file
    const { sub: userId } = req.user;
    if (!file)
        throw 'Please choose photo to upload';
    const { path } = file;
    photoService.saveTempPhoto({ path, userId }).then((data) => {
        res.json(data);
    }).catch(next)
};

// Get User Profile
getUserProfile = (req, res, next) => {
    const { sub: userId } = req.user;
    authService.getUserProfile(userId).then((data) => {
        res.json(data);
    }).catch(next)
};

// Forget Password
forgetPassword = (req, res, next) => {
    const { email } = req.body;
    authService.forgetPassword(email).then((data) => {
        res.json(data);
    }).catch(next)
};

// Reset Password
resetPassword = (req, res, next) => {
    const { newPassword, reEnterPassword, token } = req.body;
    authService.resetPassword({ newPassword, reEnterPassword, token }).then((data) => {
        res.json(data);
    }).catch(next)
};

module.exports = {
    login,
    register,
    revokeToken,
    uploadPhoto,
    refreshToken,
    updateProfile,
    resetPassword,
    changePassword,
    getUserProfile,
    forgetPassword
};