const _ = require('lodash');

const projectService = require('../services/projectService');
const responseStatus = require('../enums/responseStatus');
const { setTokenCookie, parseCookies } = require('../services/helperService');

// Add New Project
addProject = (req, res, next) => {
    const { name, location } = req.body;
    const { sub: userId } = req.user;
    const ipAddress = req.ip;
    const coverFile = req.body.coverImage;
    const modelFile = req.body.model;
    if (!modelFile)
        throw 'Please choose model file to upload';
    if (!coverFile)
        throw 'Please choose cover image to upload';
    const { coverImage } = coverFile;
    const { model } = modelFile;
    projectService.addProject({ name, location, model, coverImage, userId, ipAddress })
        .then(response => {
            if (response.status === responseStatus.success)
                setTokenCookie(res, response.refreshToken);
            res.json(_.omit(response, 'refreshToken'));
        }).catch(next);
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
    projectService.getProjectDetail({ projectId })
        .then(response => {
            if (response.status === responseStatus.success)
                setTokenCookie(res, response.refreshToken);
            res.json(_.omit(response, 'refreshToken'));
        }).catch(next);
};

module.exports = {
    addProject,
    getProjects,
    getProjectDetail
};