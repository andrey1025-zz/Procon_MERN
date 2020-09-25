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
router.post("/end-project", authorize(), projectController.endProject);
router.post("/add-new-task", authorize(), projectController.addTask);
router.post("/edit-task", authorize(), projectController.editTask);
router.post("/review-task", authorize(), projectController.reviewTask);
router.post("/tasks", authorize(), projectController.getTasks);
router.post("/taskforcomponent", authorize(), projectController.getTaskforComponent);
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
router.post("/start-task", authorize(), projectController.startTask);
router.post("/submit-check-task", authorize(), projectController.submitForCheckingTask);
router.post("/cancel-task", authorize(), projectController.cancelTask);
router.post("/check-task", authorize(), projectController.checkTask);
router.post("/get-task-history", authorize(), projectController.getTaskHistory);
router.post("/rework-task", authorize(), projectController.reworkTask);
router.post("/delete-task", authorize(), projectController.deleteTask);
router.post("/remove-member", authorize(), projectController.removeMember);
router.post("/clear-notification", authorize(), projectController.clearNotification);
router.post("/accept-notification", authorize(), projectController.acceptNotification);
router.post("/post-message", authorize(), projectController.postMessage);
router.post("/feedback", authorize(), projectController.leaveFeedback);
router.post("/get-feedbacks", authorize(), projectController.getFeedbacks);
router.post("/get-messages", authorize(), projectController.getTaskMessages);
router.post("/send-Email", authorize(), projectController.sendEmail);
router.post("/delete", authorize(), projectController.deleteProject);
router.post("/update-project", authorize(), projectController.updateProject);
router.post("/get-project-superintendents", authorize(), projectController.getProjectSuperintendents);
router.post("/end-task", authorize(), projectController.endTask);
router.post("/member-profile", authorize(), projectController.getMemberProfile);
router.post("/change-user-role", authorize(), projectController.changeUserRole);

module.exports = router;