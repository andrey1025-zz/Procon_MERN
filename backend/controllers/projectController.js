const _ = require('lodash');


var Axios = require('axios');               // A Promised base http client
var fs = require('fs'); // Node.js File system for reading files

const projectService = require('../services/projectService');
const responseStatus = require('../enums/responseStatus');
const { setTokenCookie, parseCookies } = require('../services/helperService');

// Variables
var FORGE_CLIENT_ID = "inAurtYxDjVvKvtYEG43viKA5IXAtHGi";
var FORGE_CLIENT_SECRET = "28pInoNjHXlQT8oT";
var access_token = '';
var scopes = 'data:read data:write data:create bucket:create bucket:read';
const querystring = require('querystring');
const { ObjectID } = require('mongodb');
const bucketKey = FORGE_CLIENT_ID.toLowerCase() + '_tutorial_bucket'; // Prefix with your ID so the bucket key is unique across all buckets on all other accounts
const policyKey = 'transient'; // Expires in 24hr

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
    Axios({
        method: 'POST',
        url: 'https://developer.api.autodesk.com/authentication/v1/authenticate',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
        data: querystring.stringify({
            client_id: FORGE_CLIENT_ID,
            client_secret: FORGE_CLIENT_SECRET,
            grant_type: 'client_credentials',
            scope: scopes
        })
    })
    .then(function (response) {
        // Success
        access_token = response.data.access_token;
        createBucket(req, res, next);
        // res.redirect('/api/forge/datamanagement/bucket/create');
    })
    .catch(function (error) {
        // Failed
        console.log(error);
        res.send('Failed to Forge API authenticate');
    });

    // const file = req.file
    // const { sub: userId } = req.user;
    // if (!file)
    //     throw 'Please choose model to upload';
    // const { path } = file;
    // projectService.uploadFile({ path, userId }).then((data) => {
    //     data.path = path;
    //     res.json(data);
    // }).catch(next)
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

// Get Task Detail
getTaskDetail = (req, res, next) => {
    const { taskId: taskId } = req.body;
    projectService.getTaskDetail(taskId).then((data) => {
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

// Get Tasks
getTasks = (req, res, next) => {
    const { projectId: projectId } = req.body;
    projectService.getTasks(projectId)
        .then(response => {
            if (response.status === responseStatus.success)
                setTokenCookie(res, response.refreshToken);
            res.json(_.omit(response, 'refreshToken'));
        }).catch(next);
};

// Get Users
getUsers = (req, res, next) => {
    const { projectId: projectId } = req.body;
    projectService.getUsers(projectId)
        .then(response => {
            if (response.status === responseStatus.success)
                setTokenCookie(res, response.refreshToken);
            res.json(_.omit(response, 'refreshToken'));
        }).catch(next);
};

// Get Superintendents
getSuperintendents = (req, res, next) => {
    const { projectId: projectId } = req.body;
    projectService.getSuperintendents(projectId)
        .then(response => {
            if (response.status === responseStatus.success)
                setTokenCookie(res, response.refreshToken);
            res.json(_.omit(response, 'refreshToken'));
        }).catch(next);
};

// Get Engineers
getEngineers = (req, res, next) => {
    const { projectId: projectId } = req.body;
    projectService.getEngineers(projectId)
        .then(response => {
            if (response.status === responseStatus.success)
                setTokenCookie(res, response.refreshToken);
            res.json(_.omit(response, 'refreshToken'));
        }).catch(next);
};

// Get Members
getMembers = (req, res, next) => {
    const { projectId: projectId } = req.body;
    projectService.getMembers(projectId)
        .then(response => {
            if (response.status === responseStatus.success)
                setTokenCookie(res, response.refreshToken);
            res.json(_.omit(response, 'refreshToken'));
        }).catch(next);
};

// Invite Superintendent to Project
inviteSuperintendent = (req, res, next) => {
    const { projectId: projectId, superintendentId: superintendentId } = req.body;
    const { sub: userId } = req.user;
    projectService.inviteSuperintendent({ projectId, superintendentId, userId }).then((data) => {
        res.json(data);
    }).catch(next)
};

// Invite Superintendent to Project
inviteMember = (req, res, next) => {
    const { projectId: projectId, taskId: taskId, memberId: memberId } = req.body;
    const { sub: userId } = req.user;
    projectService.inviteMember({ projectId, taskId, memberId, userId }).then((data) => {
        res.json(data);
    }).catch(next)
};

getForgeAccessToken = (req, res, next) => {
    Axios({
        method: 'POST',
        url: 'https://developer.api.autodesk.com/authentication/v1/authenticate',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
        data: querystring.stringify({
            client_id: FORGE_CLIENT_ID,
            client_secret: FORGE_CLIENT_SECRET,
            grant_type: 'client_credentials',
            scope: 'viewables:read'
        })
    })
        .then(function (response) {
            // Success
            // console.log(response);
            res.json({ access_token: response.data.access_token, expires_in: response.data.expires_in });
        })
        .catch(function (error) {
            // Failed
            console.log(error);
            res.status(500).json(error);
        });
}

function createBucket(req, res, next) {
    Axios({
        method: 'POST',
        url: 'https://developer.api.autodesk.com/oss/v2/buckets',
        headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer ' + access_token
        },
        data: JSON.stringify({
            'bucketKey': bucketKey,
            'policyKey': policyKey
        })
    })
    .then(function (response) {
        // Success
        // console.log(response);
        getBucketDetail(req, res, next);
    })
    .catch(function (error) {
        if (error.response && error.response.status == 409) {
            // console.log('Bucket already exists, skip creation.');
            getBucketDetail(req, res, next);
        }
        // Failed
        // console.log(error);
        // res.send('Failed to create a new bucket');
    });
}

function getBucketDetail(req, res, next) {
    Axios({
        method: 'GET',
        url: 'https://developer.api.autodesk.com/oss/v2/buckets/' + encodeURIComponent(bucketKey) + '/details',
        headers: {
            Authorization: 'Bearer ' + access_token
        }
    })
        .then(function (response) {
            console.log("get bucket detail success");
            // Success
            // console.log(response);
            // res.redirect('/upload.html');
            uploadToBucket(req, res, next);
        })
        .catch(function (error) {
            // Failed
            // console.log(error);
            res.send('Failed to verify the new bucket');
        });
}

function uploadToBucket(req, res, next) {
    fs.readFile(req.file.path, function (err, filecontent) {
        Axios({
            method: 'PUT',
            url: 'https://developer.api.autodesk.com/oss/v2/buckets/' + encodeURIComponent(bucketKey) + '/objects/' + encodeURIComponent(req.file.originalname),
            headers: {
                Authorization: 'Bearer ' + access_token,
                'Content-Disposition': req.file.originalname,
                'Content-Length': filecontent.length
            },
            data: filecontent
        })
            .then(function (response) {
                // Success
                // console.log(response.data);
                var urn = Buffer.from(response.data.objectId).toString('base64')
                // var urn = response.data.objectId.toBase64();
                console.log("type of object id");
                console.log(urn);
                const file = req.file
                derivativeModel(req, res, next, urn);
                // res.redirect('/api/forge/modelderivative/' + urn);
            })
            .catch(function (error) {
                // Failed
                console.log(error);
                // res.send('Failed to create a new object in the bucket');
            });
    });
}

function derivativeModel(req, res, next, urn) {
    var format_type = 'svf';
    var format_views = ['2d', '3d'];
    Axios({
        method: 'POST',
        url: 'https://developer.api.autodesk.com/modelderivative/v2/designdata/job',
        headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer ' + access_token
        },
        data: JSON.stringify({
            'input': {
                'urn': urn
            },
            'output': {
                'formats': [
                    {
                        'type': format_type,
                        'views': format_views
                    }
                ]
            }
        })
    })
        .then(function (response) {
            // Success
            console.log(response);
            // res.redirect('/viewer.html?urn=' + urn);
            const { sub: userId } = req.user;
            const result_urn = response.data.urn;
            projectService.uploadFile({ result_urn, userId }).then((data) => {
                data.path = result_urn;
                res.json(data);
            }).catch(next)
        })
        .catch(function (error) {
            // Failed
            console.log(error);
            res.send('Error at Model Derivative job.');
        });
}

module.exports = {
    addProject,
    getProjects,
    getProjectDetail,
    uploadCoverImage,
    uploadModel,
    addTask,
    getTasks,
    getForgeAccessToken,
    getUsers,
    getSuperintendents,
    getEngineers,
    getMembers,
    getTaskDetail,
    inviteSuperintendent,
    inviteMember,
    createBucket,
    getBucketDetail,
    uploadToBucket,
    derivativeModel
};