const express = require("express");
const router = express.Router();

const validate = require('../middleware/validator');
const authorize = require('../middleware/authorize');
const authController = require('../controllers/authController');
const uploadPhoto = require('../middleware/photoHandler');
const { loginValidation,
    registerValidation,
    profileValidations,
    revokeTokenValidations,
    resetPasswordValidations,
    changePasswordValidations,
    forgetPasswordValidations,
} = require('../validations/authValidations');

router.post("/refresh-token", authController.refreshToken);
router.post("/profile", authorize(), authController.getUserProfile);
router.post("/login", validate(loginValidation), authController.login);
router.post("/forget-password", validate(forgetPasswordValidations), authController.forgetPassword);
router.post("/register", validate(registerValidation), authController.register);
router.post("/logout", authorize(), validate(revokeTokenValidations), authController.revokeToken);
router.post("/update-profile", authorize(), validate(profileValidations), authController.updateProfile);
router.post('/reset-password', validate(resetPasswordValidations), authController.resetPassword);
router.post('/change-password', authorize(), validate(changePasswordValidations), authController.changePassword);
router.post("/upload-profile-picture", authorize(), uploadPhoto.single('photo'), authController.uploadPhoto);

module.exports = router;