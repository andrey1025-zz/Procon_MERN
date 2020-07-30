const _ = require('lodash');

const projectService = require('../services/projectService');
const responseStatus = require('../enums/responseStatus');
const { setTokenCookie, parseCookies } = require('../services/helperService');

// Add New Project
addProject = (req, res, next) => {
    const { name, location } = req.body;
    const { sub: userId } = req.user;

    const ipAddress = req.ip;
    const coverImage = req.body.coverImage;
    const model = req.body.model;
    projectService.addProject({ name, location, model, coverImage, userId, ipAddress })
        .then(response => {
            if (response.status === responseStatus.success)
                setTokenCookie(res, response.refreshToken);
            res.json(_.omit(response, 'refreshToken'));
        }).catch(next);
};

// Upload Cover Image
uploadCoverImage = (req, res, next) => {
    const file = req.file
    const { sub: userId } = req.user;
    if (!file)
        throw 'Please choose cover image to upload';
    const { path } = file;
    projectService.uploadFile({ path, userId }).then((data) => {
        data.path = path;
        res.json(data);
    }).catch(next)
};

// Upload Project Model
uploadModel = (req, res, next) => {
    const file = req.file
    const { sub: userId } = req.user;
    if (!file)
        throw 'Please choose model to upload';
    const { path } = file;
    projectService.uploadFile({ path, userId }).then((data) => {
        data.path = path;
        res.json(data);
    }).catch(next)
};

// Get Projects
getProjects = (req, res, next) => {
    const { sub: userId } = req.user;
    projectService.getProjects(userId)
        .then(response => {
            if (response.status === responseStatus.success)
                setTokenCookie(res, response.refreshToken);
            res.json(_.omit(response, 'refreshToken'));
        }).catch(next);
};

// Get Project Detail
getProjectDetail = (req, res, next) => {
    const { projectId: projectId } = req.body;
    projectService.getProjectDetail(projectId).then((data) => {
        res.json(data);
    }).catch(next)
};

// Add New Task
addTask = (req, res, next) => {
    const { name, startTime, endTime, equipTools, components, materials, workingArea, weather, siteCondition, nearbyIrrelevantObjects, cultural_legal_constraints, technical_safety_specifications, publicRelationRequirements, projectId } = req.body;
    const { sub: userId } = req.user;

    const ipAddress = req.ip;
    projectService.addTask({ name, startTime, endTime, equipTools, components, materials, workingArea, weather, siteCondition, nearbyIrrelevantObjects, cultural_legal_constraints, technical_safety_specifications, publicRelationRequirements, projectId, userId, ipAddress })
        .then(response => {
            if (response.status === responseStatus.success)
                setTokenCookie(res, response.refreshToken);
            res.json(_.omit(response, 'refreshToken'));
        }).catch(next);
};

module.exports = {
    addProject,
    getProjects,
    getProjectDetail,
    uploadCoverImage,
    uploadModel,
    addTask
};