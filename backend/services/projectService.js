const _ = require('lodash');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

const config = require('config');
const User = require('../models/userModel');
const Project = require('../models/projectModel');
const TempFiles = require('../models/tempFilesModel');
const mailService = require('../services/mailService');
const responseStatus = require("../enums/responseStatus");
const RefreshToken = require("../models/refreshTokenModel");
const { basicDetails, projectDetails } = require('../services/helperService');
const { SupervisorRole, ProjectManagerRole, EngineerRole, MemberRole } = require('../enums/roles');
const { Console } = require('console');
const saltRounds = 10;

// Add New Project
async function addProject({ name, location, model, coverImage, userId, ipAddress }) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        // Check if name already add
        const user = await User.findById(userId);
        if (user.role != ProjectManagerRole) {
            return {
                ...response,
                errorMessage: {
                    ...response.errorMessage,
                    email: "Only Project Manager can add new Project"
                }
            };
        } else {
            // Create new project
            const userId = user.id;
            const project = new Project({
                name,
                location,
                coverImage,
                model,
                userId
            });

            const session = await mongoose.startSession();
            try {
                const opts = { session, returnOriginal: false };
                //await session.startTransaction();
                await RefreshToken.createCollection();
                await Project.createCollection();
                await project.save(opts);
                const jwtToken = generateJwtToken(user);
                const refreshToken = generateRefreshToken(user, ipAddress);
                await refreshToken.save(opts);
                //await session.commitTransaction();
                await session.endSession();
                return {
                    ...response,
                    status: responseStatus.success,
                    errorMessage: {},
                    token: jwtToken,
                    refreshToken: refreshToken.token,
                    project: projectDetails(project),
                    user: basicDetails(user)
                };
            } catch (error) {
                //await session.abortTransaction();
                await session.endSession();
                throw error;
            }
        }
    }
    catch (error) {
        throw error
    }
};

// upload file
async function uploadFile(tempFile) {
    const response = {
        status: responseStatus.failure
    };
    try {
        if (Array.isArray(tempFile)) {
            return {
                ...response,
                status: responseStatus.success,
                // tempPhotoId: newTempFiles.insertedIds
            }
        }
        else if (typeof tempFile === "object") {
            return {
                ...response,
                status: responseStatus.success
            };
        }
    } catch (error) {

        return {
            ...response,
            status: responseStatus.failure,
            errorMessage: {
                fatalError: error
            }
        };
    }
};

// Get Projects
async function getProjects(userId) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const user = await User.findById(userId);
        if(user.role == ProjectManagerRole){
            const projects = await Project.find({ userId: userId });
            try {
                projects.forEach(project => {
                    project.coverImage = project.coverImage ? `${config.assetsBaseUrl}/${project.coverImage}` : null;
                });
                return {
                    ...response,
                    status: responseStatus.success,
                    errorMessage: {},
                    projects: projects
                };
            } catch (error) {
                throw error;
            }
        } else {
            const all_projects = await Project.find();
            all_projects.forEach(project => {
                project.coverImage = project.coverImage ? `${config.assetsBaseUrl}/${project.coverImage}` : null;
            });
            try {
                return {
                    ...response,
                    status: responseStatus.success,
                    errorMessage: {},
                    projects: all_projects
                };
            } catch (error) {
                throw error;
            }
        }
    }
    catch (error) {
        throw error;
    }
};

async function getProjectDetail(projectId) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const project = await Project.findById(projectId);
        if (project === null) {
            throw `Project with id ${id} doesn't exist`
        }
        try {
            return {
                ...response,
                status: responseStatus.success,
                errorMessage: {},
                data: project
            };
        } catch (error) {
            throw error;
        }
    }
    catch (error) {
        throw error;
    }
};

//#region helper functions
function generateJwtToken(user) {
    return jwt.sign({ sub: user.id, id: user.id }, config.secret, { expiresIn: '15m' });
};

function generateRefreshToken(user, ipAddress) {
    // create a refresh token that expires in 7 days
    return new RefreshToken({
        user: user.id,
        token: randomTokenString(),
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdByIp: ipAddress
    });
};

function randomTokenString() {
    return crypto.randomBytes(40).toString('hex');
};

module.exports = {
    addProject,
    getProjects,
    getProjectDetail,
    uploadFile
};