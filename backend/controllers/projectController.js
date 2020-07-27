const _ = require('lodash');

const projectService = require('../services/projectService');
const responseStatus = require('../enums/responseStatus');
const { setTokenCookie, parseCookies } = require('../services/helperService');

// Add New Project
addProject = (req, res, next) => {
    const { name, location } = req.body;
    const { sub: userId } = req.user.id;
    console.log(req);
    console.log("========");

    const ipAddress = req.ip;
<<<<<<< HEAD
    const coverImage = req.body.coverImage;
    const model = req.body.model;
=======
    const coverFile = req.body.coverImage;
    const modelFile = req.body.model;

    if (!modelFile)
        throw 'Please choose model file to upload';
    if (!coverFile)
        throw 'Please choose cover image to upload';
    const { coverImage } = coverFile;
    const { model } = modelFile;
>>>>>>> aa1facda977bc8f89d0f2583725507b5c6651ab0
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
    getProjectDetail,
    uploadCoverImage,
    uploadModel
};