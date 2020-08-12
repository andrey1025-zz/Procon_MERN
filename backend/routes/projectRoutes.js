const express = require("express");
const router = express.Router();

const validate = require('../middleware/validator');
const authorize = require('../middleware/authorize');
const projectController = require('../controllers/projectController');
const uploadPhoto = require('../middleware/photoHandler');
const uploadModel = require('../middleware/modelHandler');
const { 
    addValidation,
} = require('../validations/projectValidations');

router.post("/upload-cover-image", authorize(), uploadPhoto.single('cover_file'), projectController.uploadCoverImage);
router.post("/upload-model", authorize(), uploadModel.single('model_file'), projectController.uploadModel);
router.post("/add-new-project", authorize(), projectController.addProject);
router.post("/list", authorize(), projectController.getProjects);
router.post("/detail", authorize(), projectController.getProjectDetail);
router.post("/add-new-task", authorize(), projectController.addTask);
router.post("/edit-task", authorize(), projectController.editTask);
router.post("/review-task", authorize(), projectController.reviewTask);
router.post("/tasks", authorize(), projectController.getTasks);
router.post("/invite-superintendent", authorize(), projectController.inviteSuperintendent);
router.post("/invite-member", authorize(), projectController.inviteMember);
router.post("/invite-engineer", authorize(), projectController.inviteEngineer);
router.post("/get-forge-token", authorize(), projectController.getForgeAccessToken);
router.post("/users", authorize(), projectController.getUsers);
router.post("/superintendents", authorize(), projectController.getSuperintendents);
router.post("/engineers", authorize(), projectController.getEngineers);
router.post("/members", authorize(), projectController.getMembers);
router.post("/task-detail", authorize(), projectController.getTaskDetail);
router.post("/get-notification-count", authorize(), projectController.getNotificationCount);
router.post("/get-notifications", authorize(), projectController.getNotifications);
router.post("/get-task-engineers", authorize(), projectController.getTaskEngineers);
router.post("/get-task-members", authorize(), projectController.getTaskMembers);

module.exports = router;