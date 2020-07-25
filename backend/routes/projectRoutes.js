const express = require("express");
const router = express.Router();

const validate = require('../middleware/validator');
const authorize = require('../middleware/authorize');
const projectController = require('../controllers/projectController');
const { 
    addValidation,
} = require('../validations/projectValidations');

router.post("/add-new-project", authorize(), validate(addValidation), projectController.addProject);
router.post("/list", authorize(), projectController.getProjects);
router.post("/detail", authorize(), projectController.getProjectDetail);

module.exports = router;