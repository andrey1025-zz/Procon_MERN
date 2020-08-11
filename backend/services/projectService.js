const _ = require('lodash');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

const config = require('config');
const User = require('../models/userModel');
const Project = require('../models/projectModel');
const Notification = require('../models/notificationModel');
const TempFiles = require('../models/tempFilesModel');
const mailService = require('../services/mailService');
const responseStatus = require("../enums/responseStatus");
const RefreshToken = require("../models/refreshTokenModel");
const { basicDetails, projectDetails } = require('../services/helperService');
const { SupervisorRole, ProjectManagerRole, EngineerRole, MemberRole } = require('../enums/roles');
const { NotStart, Inprogress, Completed, Created, Reviewed } = require('../enums/taskStatus');
const { Console } = require('console');
const { ObjectID } = require('mongodb');
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
            throw `Project with id ${projectId} doesn't exist`
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

// Add New Project
async function addTask({ components, componentId, projectId, userId, ipAddress }) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        // Check if name already add
        const user = await User.findById(userId);
        const project = await Project.findById(projectId);
        if (user.role != SupervisorRole) {
            return {
                ...response,
                errorMessage: {
                    ...response.errorMessage,
                    email: "Only Superintendent can add new Task"
                }
            };
        } else {
            // Create new project
            const task = {
                _id: new ObjectID(), name: '', startTime: '', endTime: '', equipTools: '', components: components, componentId: componentId, materials: '', workingArea: '', weather: '', siteCondition: '', nearbyIrrelevantObjects: '', cultural_legal_constraints: '', technical_safety_specifications: '', publicRelationRequirements: '', createdBy: userId, status: Created, members: []
            };
            
            await Project.updateOne(
                {_id: projectId},
                {
                    $push: {
                        tasks: task
                    }
                }
            )

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
                    taskId: task._id
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

// Edit Task Info
async function editTask({ name, startTime, endTime, equipTools, components, materials, workingArea, weather, siteCondition, nearbyIrrelevantObjects, cultural_legal_constraints, technical_safety_specifications, publicRelationRequirements, projectId, userId, ipAddress }) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        // Check if name already add
        const user = await User.findById(userId);
        const project = await Project.findById(projectId);
        if (user.role != SupervisorRole) {
            return {
                ...response,
                errorMessage: {
                    ...response.errorMessage,
                    email: "Only Superintendent can add new Task"
                }
            };
        } else {
            // Create new project
            const task = {
                _id: new ObjectID(), name: name, startTime: startTime, endTime: endTime, equipTools: equipTools, components: components, materials: materials, workingArea: workingArea, weather: weather, siteCondition: siteCondition, nearbyIrrelevantObjects: nearbyIrrelevantObjects, cultural_legal_constraints: cultural_legal_constraints, technical_safety_specifications: technical_safety_specifications, publicRelationRequirements: publicRelationRequirements, createdBy: userId, status: NotStart, members: null
            };

            // const task = {
            //     _id: new ObjectID(), name: name, startTime: startTime, endTime: endTime, equipTools: equipTools, components: components, materials: materials, workingArea: workingArea, weather: weather, siteCondition: siteCondition, nearbyIrrelevantObjects: nearbyIrrelevantObjects, cultural_legal_constraints: cultural_legal_constraints, technical_safety_specifications: technical_safety_specifications, publicRelationRequirements: publicRelationRequirements, createdBy: userId, status: Created, memberId: null, memberName: null
            // };
            
            await Project.updateOne(
                {_id: projectId},
                {
                    $push: {
                        tasks: task
                    }
                }
            )

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
                    taskId: task._id
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

// Get Tasks
async function getTasks(projectId) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const project = await Project.findById(projectId);

        var tasks = {
            notStartedTasks : [],
            inprogressTasks : [],
            completedTasks : []
        }
        try {
            project.tasks.forEach(task => {
                if(task.status == Inprogress && task.members != null)
                    tasks.inprogressTasks.push(task);
                if(task.status == Completed && task.members != null )
                    tasks.completedTasks.push(task);
                if(task.status == NotStart)
                    tasks.notStartedTasks.push(task);
            });
            return {
                ...response,
                status: responseStatus.success,
                errorMessage: {},
                tasks: tasks
            };
        } catch (error) {
            throw error;
        }
    }
    catch (error) {
        throw error;
    }
};

async function getTaskDetail(taskId) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const task = await Project.find({ "tasks": { _id: taskId } });
        if (task === null) {
            throw `Task with id ${taskId} doesn't exist`
        }
        try {
            return {
                ...response,
                status: responseStatus.success,
                errorMessage: {},
                data: task
            };
        } catch (error) {
            throw error;
        }
    }
    catch (error) {
        throw error;
    }
};

// Get Users
async function getUsers() {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const superintendents = await User.find({role: SupervisorRole});
        const engineers = await User.find({role: EngineerRole});
        const members = await User.find({role: MemberRole});
        try {
            return {
                ...response,
                status: responseStatus.success,
                errorMessage: {},
                superintendents: superintendents,
                engineers: engineers,
                members: members
            };
        } catch (error) {
            throw error;
        }
    }
    catch (error) {
        throw error;
    }
};

// Get Superintendents
async function getSuperintendents() {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const superintendents = await User.find({role: SupervisorRole});
        let data = []
        superintendents.forEach(item => {
            data.push(basicDetails(item));
        });
        try {
            return {
                ...response,
                status: responseStatus.success,
                errorMessage: {},
                superintendents: data
            };
        } catch (error) {
            throw error;
        }
    }
    catch (error) {
        throw error;
    }
};

// Get Engineers
async function getEngineers() {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const engineers = await User.find({role: EngineerRole});
        let data = []
        engineers.forEach(item => {
            data.push(basicDetails(item));
        });
        try {
            return {
                ...response,
                status: responseStatus.success,
                errorMessage: {},
                engineers: data
            };
        } catch (error) {
            throw error;
        }
    }
    catch (error) {
        throw error;
    }
};

// Get Members
async function getMembers() {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const members = await User.find({role: MemberRole});
        try {
            return {
                ...response,
                status: responseStatus.success,
                errorMessage: {},
                members: members
            };
        } catch (error) {
            throw error;
        }
    }
    catch (error) {
        throw error;
    }
};

// Invite Superintendent
async function inviteSuperintendent({ projectId, superintendentId, userId, ipAddress }) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const user = User.findById(userId);
        const superintendent = await User.findById(superintendentId);

        await Project.updateOne(
            {_id: projectId},
            {
                $addToSet: {
                    superintendent: basicDetails(superintendent)
                }
            }
        )
        const notification = new Notification({
            from: userId,
            to: superintendentId,
            message: "The project manager invited you to the project as superintendent."
        });

        const session = await mongoose.startSession();
        try {
            const opts = { session, returnOriginal: false };
            //await session.startTransaction();
            await RefreshToken.createCollection();
            await Notification.createCollection();
            await notification.save(opts);
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
                refreshToken: refreshToken.token
            };
        } catch (error) {
            //await session.abortTransaction();
            await session.endSession();
            throw error;
        }
    }
    catch (error) {
        throw error;
    }
};

// Get Task Engineers
async function getTaskEngineers({ userId, projectId, taskId }) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const user = User.findById(userId);
        var taskEngineers= [];
        if(taskId != null){
            const task = await Project.find(
                { _id: projectId }, 
                { 
                    tasks: { $elemMatch: { _id: taskId } }
                } 
            );
            if(task && task.length > 0){
                if(task[0].tasks && task[0].tasks.length > 0){
                    var task_detail = task[0].tasks[0];
                    for(i = 0; i < task_detail.engineers.length; i++){
                        const userInfo = await User.findById(task_detail.engineers[i].id);
                        taskEngineers.push(basicDetails(userInfo));
                    }
                }
            }
        }
        const session = await mongoose.startSession();
        try {
            //await session.startTransaction();
            //await session.commitTransaction();
            await session.endSession();
            return {
                ...response,
                status: responseStatus.success,
                errorMessage: {},
                data: taskEngineers
                // data: basicDetails(engineer)
            };
        } catch (error) {
            //await session.abortTransaction();
            await session.endSession();
            throw error;
        }
    }
    catch (error) {
        throw error;
    }
};

// Get Task Members
async function getTaskMembers({ userId, projectId, taskId }) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const user = User.findById(userId);
        var taskMembers = [];
        if(taskId != null){
            const task = await Project.find(
                { _id: projectId }, 
                { 
                    tasks: { $elemMatch: { _id: new ObjectID(taskId) } }
                } 
            );
            if(task && task.length > 0){
                if(task[0].tasks && task[0].tasks.length > 0){
                    var task_detail = task[0].tasks[0];
                    for(i = 0; i < task_detail.members.length; i++){
                        const userInfo = await User.findById(task_detail.members[i].id);
                        taskMembers.push(basicDetails(userInfo));
                    }
                }
            }
        }
        const session = await mongoose.startSession();
        try {
            //await session.startTransaction();
            //await session.commitTransaction();
            await session.endSession();
            return {
                ...response,
                status: responseStatus.success,
                errorMessage: {},
                data: taskMembers
            };
        } catch (error) {
            //await session.abortTransaction();
            await session.endSession();
            throw error;
        }
    }
    catch (error) {
        throw error;
    }
};

// Invite Member
async function inviteMember({ projectId, taskId, memberIds, userId, ipAddress }) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const user =  User.findById(userId);
        var members = [];
        var taskMembers = [];
        for (let i = 0; i < memberIds.length; i++) {
            members.push({id: memberIds[i], status: NotStart});
            let member = await User.findById(memberIds[i]);
            taskMembers.push(basicDetails(member));
        }

        await Project.updateOne(
            { _id: projectId },
            {
                $push: {
                    "tasks.$[elem].members": { $each: members }
                },
                $set: {
                    "tasks.$[elem].status": NotStart
                }
            },
            {
                multi: true,
                arrayFilters: [ { "elem._id": { $eq: ObjectID(taskId)} } ]
            }
        )
        
        const session = await mongoose.startSession();
        try {
            const opts = { session, returnOriginal: false };
            //await session.startTransaction();
            await RefreshToken.createCollection();
            
            // Send Notification after publishing task

            // for (let i = 0; i < memberIds.length; i++) {
            //     const old_notification = await Notification.findOne({to: memberIds[i], from: userId, taskId: taskId, projectId: projectId, isRead: false});
            //     if(old_notification && old_notification.length > 0){
            //         var count = old_notification.count + 1;
            //         old_notification.overwrite = ({count: count});
            //         await old_notification.save();
            //     } else {
            //         const notification = new Notification({
            //             from: userId,
            //             to: memberIds[i],
            //             taskId: taskId,
            //             projectId: projectId,
            //             message: "The Superintendent invited you to the task as member."
            //         });
            //         Notification.createCollection();
            //         notification.save(opts);
            //     }
            // }

            // End Sending Notification after publishing Task

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
                data: taskMembers
            };
        } catch (error) {
            //await session.abortTransaction();
            await session.endSession();
            throw error;
        }
    }
    catch (error) {
        throw error;
    }
};

// Invite Engineer
async function inviteEngineer({ projectId, engineerId, userId, taskId, ipAddress }) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const user = User.findById(userId);
        const engineer = await User.findById(engineerId);
        var engineers = [];
        engineers.push({id: engineerId, status: NotStart});
        await Project.update(
            {_id: projectId},
            {
                $addToSet: {
                    engineers: basicDetails(engineer)
                }
            }
        )

        await Project.updateOne(
            { _id: projectId },
            {
                $push: {
                    "tasks.$[elem].engineers": { $each: engineers }
                },
                $set: {
                    "tasks.$[elem].status": NotStart
                }
            },
            {
                multi: true,
                arrayFilters: [ { "elem._id": { $eq: ObjectID(taskId)} } ]
            }
        )

        const notification = new Notification({
            from: userId,
            to: engineerId,
            taskId: taskId,
            projectId: projectId,
            message: "The Superintendent invited you to the project as engineer."
        });

        const session = await mongoose.startSession();
        try {
            const opts = { session, returnOriginal: false };
            //await session.startTransaction();
            await RefreshToken.createCollection();
            await Notification.createCollection();
            await notification.save(opts);
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
                data: basicDetails(engineer)
            };
        } catch (error) {
            //await session.abortTransaction();
            await session.endSession();
            throw error;
        }
    }
    catch (error) {
        throw error;
    }
};

// Get Notification Count
async function getNotificationCount({ userId, projectId }) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const notifications = await Notification.find({to: userId, projectId: projectId, isRead: false});
        var count = 0;
        for (let i = 0; i < notifications.length; i++) {
            count += notifications[i].count;
        }
        try {
            return {
                ...response,
                status: responseStatus.success,
                errorMessage: {},
                data: count
            };
        } catch (error) {
            throw error;
        }
    }
    catch (error) {
        throw error;
    }
};

// Get Notifications
async function getNotifications({ userId, projectId }) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        var data = [];
        const notifications = await Notification.find({to: userId, projectId: projectId, isRead: false});
        for(i = 0 ; i < notifications.length; i++){
            const from = await User.findById(notifications[i].from);
            const task = await Project.find(
                { _id: projectId }, 
                { 
                    tasks: { $elemMatch: { _id: notifications[i].taskId } }
                } 
            );
            const fromUserDetail = basicDetails(from);
            var item = {
                count: notifications[i].count,
                createdOn: notifications[i].createdOn,
                message: notifications[i].message,
                firstName: fromUserDetail.firstName,
                lastName: fromUserDetail.lastName,
                photo: fromUserDetail.photo,
                mobile: fromUserDetail.mobile,
                role: fromUserDetail.role,
                taskId: notifications[i].taskId,
                taskName: task[0].tasks[0].name
            }
            data.push(item);
        }
        try {
            return {
                ...response,
                status: responseStatus.success,
                errorMessage: {},
                data: data
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
    uploadFile,
    addTask,
    editTask,
    getTasks,
    getTaskDetail,
    getSuperintendents,
    getEngineers,
    getMembers,
    inviteSuperintendent,
    inviteMember,
    inviteEngineer,
    getUsers,
    getNotificationCount,
    getNotifications,
    getTaskEngineers,
    getTaskMembers
};