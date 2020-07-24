const express = require("express");
const router = express.Router();

const validate = require('../middleware/validator');
const authorize = require('../middleware/authorize');
const projectController = require('../controllers/projectController');
const uploadPhoto = require('../middleware/photoHandler');
const uploadMedia = require('../middleware/mediaHandler');
const { 
    addValidation,
} = require('../validations/projectValidations');

router.post("/add-new-project", authorize(), validate(addValidation), uploadPhoto.single('cover'), uploadMedia.single('media'), projectController.addProject);
router.post("/list", authorize(), projectController.getProjects);
router.post("/detail", authorize(), projectController.getProjectDetail);

module.exports = router;