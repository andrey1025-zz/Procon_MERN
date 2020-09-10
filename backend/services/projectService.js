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
const { NotStart, Inprogress, Completed, Created, Reviewed, Checked } = require('../enums/taskStatus');
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
                const projects = await Project.find({ userId: userId });
                projects.forEach(project => {
                    project.coverImage = project.coverImage ? `${config.assetsBaseUrl}/${project.coverImage}` : null;
                });
                return {
                    ...response,
                    status: responseStatus.success,
                    errorMessage: {},
                    token: jwtToken,
                    refreshToken: refreshToken.token,
                    project: projectDetails(project),
                    projects : projects,
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

// Update Project
async function updateProject({ name, location, model, coverImage, projectId, userId, ipAddress }) {
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
                    email: "Only Project Manager can update Project"
                }
            };
        } else {
            // Create new project
            const userId = user.id;
            const project_data = {};
            if(name != "")
                project_data.name = name;
            if(location != "")
                project_data.location = location;
            if(model != null)
                project_data.model = model;
            if(coverImage != null)
                project_data.coverImage = coverImage;
            

            await Project.updateOne(
                { _id: projectId },
                {
                    $set: project_data
                }
            )

            const project = await Project.findById(projectId);

            const session = await mongoose.startSession();
            try {
                const opts = { session, returnOriginal: false };
                //await session.startTransaction();
                await RefreshToken.createCollection();
                const jwtToken = generateJwtToken(user);
                const refreshToken = generateRefreshToken(user, ipAddress);
                await refreshToken.save(opts);
                //await session.commitTransaction();
                await session.endSession();
                const projects = await Project.find({ userId: userId });
                projects.forEach(project => {
                    project.coverImage = project.coverImage ? `${config.assetsBaseUrl}/${project.coverImage}` : null;
                });
                return {
                    ...response,
                    status: responseStatus.success,
                    errorMessage: {},
                    token: jwtToken,
                    refreshToken: refreshToken.token,
                    project: projectDetails(project),
                    projects : projects,
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
        project.coverImage = project.coverImage ? `${config.assetsBaseUrl}/${project.coverImage}` : null;

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


// End Project
async function endProject(projectId) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        await Project.updateOne(
            {_id: projectId},
            {
                $set: {
                    'status': Completed
                }
            }
        );
        try {
            return {
                ...response,
                status: responseStatus.success,
                errorMessage: {}
            };
        } catch (error) {
            throw error;
        }
    }
    catch (error) {
        throw error;
    }
};

// Delete Project
async function deleteProject(projectId) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const project = await Project.remove({_id:projectId});
        try {
            return {
                ...response,
                status: responseStatus.success,
                errorMessage: {}
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
                _id: new ObjectID(), name: '', startTime: '', endTime: '', equipTools: '', components: components, componentId: componentId, materials: '', workingArea: '', weather: '', siteCondition: '', nearbyIrrelevantObjects: '', cultural_legal_constraints: '', technical_safety_specifications: '', publicRelationRequirements: '', createdBy: userId, status: Created, members: [],engineers: []
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
async function editTask({ name, startTime, endTime, equipTools, components, materials, workingArea, weather, siteCondition, nearbyIrrelevantObjects, cultural_legal_constraints, technical_safety_specifications, publicRelationRequirements, projectId, taskId, userId, ipAddress }) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        // Check if name already add
        const user = await User.findById(userId);
        const project = await Project.findById(projectId);
        if (user.role != EngineerRole) {
            return {
                ...response,
                errorMessage: {
                    ...response.errorMessage,
                    email: "Only Engineer can edit new Task"
                }
            };
        } else {
            // Create new project
            await Project.updateOne(
                {_id: projectId},
                {
                    $set: {
                        'tasks.$[elem].name': name,
                        'tasks.$[elem].startTime': startTime,
                        'tasks.$[elem].endTime': endTime,
                        'tasks.$[elem].equipTools': equipTools,
                        'tasks.$[elem].components': components,
                        'tasks.$[elem].materials': materials,
                        'tasks.$[elem].workingArea': workingArea,
                        'tasks.$[elem].weather': weather,
                        'tasks.$[elem].siteCondition': siteCondition,
                        'tasks.$[elem].nearbyIrrelevantObjects': nearbyIrrelevantObjects,
                        'tasks.$[elem].cultural_legal_constraints': cultural_legal_constraints,
                        'tasks.$[elem].technical_safety_specifications': technical_safety_specifications,
                        'tasks.$[elem].publicRelationRequirements': publicRelationRequirements,
                        'tasks.$[elem].status': Reviewed
                    }
                },
                {
                    multi: true,
                    arrayFilters: [ { "elem._id": { $eq: ObjectID(taskId)} } ]
                }
            )
            await Notification.deleteOne(
                { projectId: ObjectID(projectId), taskId: ObjectID(taskId), to: ObjectID(userId), type: 0 }
            )
            const notification = new Notification({
                from: userId,
                to: project.superintendent[0].id,
                taskId: taskId,
                projectId: projectId,
                message: "The Engineer edited the project you created task."
            });

            const session = await mongoose.startSession();
            try {
                const opts = { session, returnOriginal: false };
                //await session.startTransaction();
                await RefreshToken.createCollection();
                await Project.createCollection();
                await project.save(opts);
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
                    taskId: taskId
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

async function reviewTask({projectId, taskId, userId, ipAddress }) {
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
                    email: "Only Supervisor can review this Task"
                }
            };
        } else {
            // Create new project
            await Project.updateOne(
                {_id: projectId},
                {
                    $set: {
                        'tasks.$[elem].status': NotStart
                    }
                },
                {
                    multi: true,
                    arrayFilters: [ { "elem._id": { $eq: ObjectID(taskId)} } ]
                }
            )
            
            const task = await Project.find(
                { _id: projectId }, 
                { 
                    tasks: { $elemMatch: { _id: new ObjectID(taskId) } },
                } 
            );
            
            var members = [];
            var engineerId = null;

            if(task && task[0] && task[0].tasks[0]){
                members = task[0].tasks[0].members;
                engineerId = task[0].tasks[0].engineers[0].id;
            }

            await Notification.deleteOne(
                { projectId: ObjectID(projectId), taskId: ObjectID(taskId), from: ObjectID(engineerId), to: ObjectID(userId), type: 0 },
                // {projectId: projectId, taskId:taskId, from: engineerId, to: userId},
            )

            const session = await mongoose.startSession();
            const opts = { session, returnOriginal: false };

            for(i = 0; i < members.length; i++){
                const old_notification = await Notification.findOne({to: members[i].id, from: userId, taskId: taskId, projectId: projectId, isRead: false});
                if(old_notification && old_notification.length > 0){
                    var count = old_notification.count + 1;
                    old_notification.overwrite = ({count: count});
                    await old_notification.save();
                } else {
                    const notification = new Notification({
                        from: userId,
                        to: members[i].id,
                        taskId: taskId,
                        projectId: projectId,
                        message: "The Superintendent invited you to the task as a member."
                    });
                    Notification.createCollection();
                    notification.save(opts);
                }
            }

            const notification = new Notification({
                from: userId,
                to: engineerId,
                taskId: taskId,
                projectId: projectId,
                message: "The Superintendent reviewed the project you edited task."
            });

            try {
                //await session.startTransaction();
                await RefreshToken.createCollection();
                await Project.createCollection();
                await project.save(opts);
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
                    taskId: taskId
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

// Get Task History
async function getTaskHistory(projectId) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const project = await Project.findById(projectId);

        try {
            var tasks = [];
            for(i = 0; i < project.tasks.length; i++){
                // var task = project.tasks[i];
                var item = {
                    superintendent: null,
                    id: null,
                    startTime: null,
                    endTime: null,
                    taskName: null,
                    members: [],
                    coverImage: null
                };

                if(project.superintendent.length > 0 && project.superintendent[0]){
                    var superintendent = await User.findById(project.superintendent[0].id);
                    item.superintendent = basicDetails(superintendent);
                }

                item.coverImage = project.coverImage ? `${config.assetsBaseUrl}/${project.coverImage}` : null
                if(project.tasks[i].status == Completed ){
                    item.id = project.tasks[i]._id;
                    item.startTime = project.tasks[i].startTime;
                    item.endTime = project.tasks[i].endTime;
                    item.taskName = project.tasks[i].name;
                    for(j = 0; j < project.tasks[i].engineers.length; j++){
                        const engineer = await User.findById(project.tasks[i].engineers[j].id);
                        item.members.push(basicDetails(engineer));
                    }
                    for(k = 0; k < project.tasks[i].engineers.length; k++){
                        const member = await User.findById(project.tasks[i].engineers[k].id);
                        item.members.push(basicDetails(member));
                    }
                    tasks.push(item);
                }
            }
            return {
                ...response,
                status: responseStatus.success,
                errorMessage: {},
                data: tasks
            };
        } catch (error) {
            throw error;
        }
    }
    catch (error) {
        throw error;
    }
};

async function getTaskDetail(projectId, taskId) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const task = await Project.find(
            { _id: projectId }, 
            { 
                tasks: { $elemMatch: { _id: new ObjectID(taskId) } },
            } 
        );
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

async function postMessage(projectId, taskId, userId, message) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const task = await Project.find(
            { _id: projectId }, 
            { 
                tasks: { $elemMatch: { _id: new ObjectID(taskId) } },
            } 
        );
        
        var members = [];

        if(task && task[0] && task[0].tasks[0]){
            members = task[0].tasks[0].members;
        }
        
        const session = await mongoose.startSession();

        // for(i = 0; i < members.length; i++){
        //     const old_notification = await Notification.findOne({to: members[i].id, from: userId, taskId: taskId, projectId: projectId, isRead: false});
        //     if(old_notification && old_notification.length > 0){
        //         var count = old_notification.count + 1;
        //         old_notification.overwrite = ({count: count});
        //         await old_notification.save();
        //     } else {
        //         const session1 = await mongoose.startSession();
        //         const opts = { session1, returnOriginal: false };
        //         const notification = new Notification({
        //             from: userId,
        //             to: members[i].id,
        //             taskId: taskId,
        //             projectId: projectId,
        //             message: message,
        //             type: 1
        //         });
        //         Notification.createCollection();
        //         notification.save(opts);
        //     }
        // }

        const session1 = await mongoose.startSession();
        const opts = { session1, returnOriginal: false };
        const notification = new Notification({
            from: userId,
            to: new ObjectID(),
            taskId: taskId,
            projectId: projectId,
            message: message,
            type: 1
        });
        Notification.createCollection();
        notification.save(opts);

        try {
            //await session.startTransaction();
            //await session.commitTransaction();
            await session.endSession();
            return {
                ...response,
                status: responseStatus.success,
                errorMessage: {}
            };
        } catch (error) {
            throw error;
        }
    }
    catch (error) {
        throw error;
    }
};

async function leaveFeedback(projectId, taskId, userId, message) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const user = User.findById(userId);
        await Project.updateOne(
            { _id: projectId },
            {
                $push: {
                    "tasks.$[elem].feedback": {id: userId, message: message}
                }
            },
            {
                multi: true,
                arrayFilters: [ { "elem._id": { $eq: ObjectID(taskId)} } ]
            }
        )
        
        const session = await mongoose.startSession();

        const task = await Project.find(
            { _id: projectId }, 
            { 
                tasks: { $elemMatch: { _id: new ObjectID(taskId) } },
            } 
        );
        var engineerId = null;

        if(task && task[0] && task[0].tasks[0]){
            engineerId = task[0].tasks[0].engineers[0].id;
        }

        const opts = { session, returnOriginal: false };
        const user_detail = basicDetails(user);
        const notification = new Notification({
            from: userId,
            to: engineerId,
            taskId: taskId,
            projectId: projectId,
            message: `The ${user_detail.firstName+` `+user_detail.lastName} left feedback.`
        });
        Notification.createCollection();
        notification.save(opts);

        try {
            //await session.startTransaction();
            //await session.commitTransaction();
            await session.endSession();
            return {
                ...response,
                status: responseStatus.success,
                errorMessage: {}
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
        var data = [];
        for(i = 0 ; i < members.length; i++){
            data.push(basicDetails(members[i]));
        }
        try {
            return {
                ...response,
                status: responseStatus.success,
                errorMessage: {},
                members: data
            };
        } catch (error) {
            throw error;
        }
    }
    catch (error) {
        throw error;
    }
};

// Get Member Profile
async function getMemberProfile(memberId) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const member = await User.findById(memberId);
        try {
            return {
                ...response,
                status: responseStatus.success,
                errorMessage: {},
                data: {
                    firstName: member.firstName,
                    lastName: member.lastName,
                    email: member.email,
                    mobile: member.mobile,
                    dob: member.dob,
                    address: member.address,
                    experience: member.experience,
                    photo: member.photo ? `${config.assetsBaseUrl}/${member.photo}` : null,
                    role: member.role
                }
            };
        } catch (error) {
            throw error;
        }
    }
    catch (error) {
        throw error;
    }
};

// Change User Role
async function changeUserRole({ memberId, role }) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const user = await User.findById(memberId);
        await user.updateOne({ role: role });
        try {
            return {
                ...response,
                status: responseStatus.success,
                errorMessage: {}
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
                $push: {
                    superintendent: basicDetails(superintendent)
                }
            }
        )
        const notification = new Notification({
            from: userId,
            to: superintendentId,
            projectId: projectId,
            taskId: null,
            message: "The project manager invited you to the project as a superintendent."
        });

        const session = await mongoose.startSession();
        try {
            const opts = { session, returnOriginal: false };
            //await session.startTransaction();
            await RefreshToken.createCollection();
            // await Notification.createCollection();
            // await notification.save(opts);
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

// Get Task Engineers
async function getProjectSuperintendents({ userId, projectId }) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        var superintendent;
        if(projectId != null){
            const project = await Project.find(
                { _id: projectId }
            );
            if(project && project.length> 0 && project[0].superintendent && project[0].superintendent.length > 0){
                const user = await User.findById(project[0].superintendent[0].id);
                superintendent = basicDetails(user);
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
                data: superintendent
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
                        let basic_detail = basicDetails(userInfo);
                        basic_detail.status = task_detail.members[i].status;
                        taskMembers.push(basic_detail);
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

// Get Task Members
async function getFeedbacks({ userId, projectId, taskId }) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const user = User.findById(userId);
        var feedBacks = [];
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
                    if(task_detail.feedback && task_detail.feedback.length > 0){
                        for(i = 0; i < task_detail.feedback.length; i++){
                            var userInfo = await User.findById(task_detail.feedback[i].id);
                            var basic_detail = basicDetails(userInfo);
                            basic_detail.feedback = task_detail.feedback[i].message;
                            console.log(basic_detail);
                            feedBacks.push(basic_detail);
                        }
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
                data: feedBacks
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

// Start Task
async function startTask({ userId, projectId, taskId }) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const user = await User.findById(userId);
        var taskMembers = [];
        if(taskId != null){
            await Project.updateOne(
                {_id: projectId},
                {
                    $set: {
                        'tasks.$[elem].status': Inprogress
                    }
                },
                {
                    multi: true,
                    arrayFilters: [ { "elem._id": { $eq: ObjectID(taskId)} } ]
                }
            );

            await Project.updateOne(
                {_id: projectId},
                {
                    $set: {
                        'tasks.$[elem].members.$[elem1].status': Inprogress
                    }
                },
                {
                    multi: true,
                    arrayFilters: [ { "elem._id": ObjectID(taskId) } , { "elem1.id": userId } ]
                }
            );

            await User.updateOne(
                { _id: userId },
                { 
                    $set: {
                        status: Inprogress
                    }
                }
            );

            await Notification.deleteOne(
                { projectId: ObjectID(projectId), taskId: ObjectID(taskId), to: ObjectID(userId), type: 0 },
                // {projectId: projectId, taskId:taskId, to: userId},
            );

            const task = await Project.find(
                { _id: projectId }, 
                { 
                    tasks: { $elemMatch: { _id: new ObjectID(taskId) } },
                } 
            );
            var engineerId = null;

            if(task && task[0] && task[0].tasks[0]){
                engineerId = task[0].tasks[0].engineers[0].id;
            }

            const session = await mongoose.startSession();
            const opts = { session, returnOriginal: false };
            const user_detail = basicDetails(user);
            const notification = new Notification({
                from: userId,
                to: engineerId,
                taskId: taskId,
                projectId: projectId,
                message: `The ${user_detail.firstName+` `+user_detail.lastName} started task you invited.`
            });
            Notification.createCollection();
            notification.save(opts);
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

// Submit For Checking Task
async function submitForCheckingTask({ userId, projectId, taskId }) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const user = await User.findById(userId);
        var taskMembers = [];
        if(taskId != null){

            await Project.updateOne(
                {_id: projectId},
                {
                    $set: {
                        'tasks.$[elem].members.$[elem1].status': Completed
                    }
                },
                {
                    multi: true,
                    arrayFilters: [ { "elem._id": ObjectID(taskId) } , { "elem1.id": userId } ]
                }
            );

            await User.updateOne(
                { _id: userId },
                { 
                    $set: {
                        status: Completed
                    }
                }
            );

            await Notification.deleteOne(
                { projectId: ObjectID(projectId), taskId: ObjectID(taskId), to: ObjectID(userId), type: 0 },
                // {projectId: projectId, taskId:taskId, to: userId},
            );

            const task = await Project.find(
                { _id: projectId }, 
                { 
                    tasks: { $elemMatch: { _id: new ObjectID(taskId) } },
                } 
            );

            const project = await Project.findById(projectId);
            var engineerId = null;
            var superintendentId = null;

            if(task && task[0] && task[0].tasks[0]){
                engineerId = task[0].tasks[0].engineers[0].id;
            }

            if(project && project.superintendent){
                superintendentId = project.superintendent[0].id;
            }

            const session = await mongoose.startSession();
            const opts = { session, returnOriginal: false };
            const user_detail = basicDetails(user);
            const notification = new Notification({
                from: userId,
                to: engineerId,
                taskId: taskId,
                projectId: projectId,
                message: `The ${user_detail.firstName+` `+user_detail.lastName} submitted task for checking.`
            });
            Notification.createCollection();
            notification.save(opts);

            const notification2 = new Notification({
                from: userId,
                to: superintendentId,
                taskId: taskId,
                projectId: projectId,
                message: `The ${user_detail.firstName+` `+user_detail.lastName} submitted task for checking.`
            });
            Notification.createCollection();
            notification2.save(opts);
        }
        const session = await mongoose.startSession();
        try {
            //await session.startTransaction();
            //await session.commitTransaction();
            await session.endSession();
            return {
                ...response,
                status: responseStatus.success,
                errorMessage: {}
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

// Check Task
async function checkTask({ userId, projectId, taskId, memberId }) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const user = await User.findById(userId);
        const project = await Project.findById(projectId);
        if(taskId != null){

            await Project.updateOne(
                {_id: projectId},
                {
                    $set: {
                        'tasks.$[elem].members.$[elem1].status': Checked
                    }
                },
                {
                    multi: true,
                    arrayFilters: [ { "elem._id": ObjectID(taskId) } , { "elem1.id": memberId } ]
                }
            );

            await Notification.deleteOne(
                { projectId: ObjectID(projectId), taskId: ObjectID(taskId), to: ObjectID(userId), type: 0 },
                // {projectId: projectId, taskId:taskId, to: userId},
            );

            await User.updateOne(
                { _id: memberId },
                { 
                    $set: {
                        status: Checked
                    }
                }
            );

            const session = await mongoose.startSession();
            const opts = { session, returnOriginal: false };
            const user_detail = basicDetails(user);
            const notification = new Notification({
                from: userId,
                to: memberId,
                taskId: taskId,
                projectId: projectId,
                message: `The ${user_detail.firstName+` `+user_detail.lastName} checked your work.`
            });
            Notification.createCollection();
            notification.save(opts);

            const task = await Project.find(
                { _id: projectId }, 
                { 
                    tasks: { $elemMatch: { _id: new ObjectID(taskId) } },
                } 
            );

            var total_status = 1;

            if(task && task[0] && task[0].tasks[0]){
                for(i = 0; i < task[0].tasks[0].members; i++){
                    if(task[0].tasks[0].members[i].status == Checked)
                        total_status *= 1;
                    else
                        total_status *= 0;
                }
            }

            // console.log("total_status", total_status);

            if(total_status == 1){
                await Project.updateOne(
                    {_id: projectId},
                    {
                        $set: {
                            'tasks.$[elem].status': Completed
                        }
                    },
                    {
                        multi: true,
                        arrayFilters: [ { "elem._id": { $eq: ObjectID(taskId)} } ]
                    }
                );
            }

            var projectStatus = 1;
            if(project && project.tasks && project.tasks.length > 0){
                for(j = 0; j < project.tasks.length; j++){
                    if(project.tasks[j].status == Checked)
                        projectStatus *= 1;
                    else
                        projectStatus *= 0;
                }
            }

            // console.log("total_status", total_status);

            if(projectStatus == 1){
                await Project.updateOne(
                    {_id: projectId},
                    {
                        $set: {
                            'status': Completed
                        }
                    }
                );
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
                errorMessage: {}
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

// Rework Task
async function reworkTask({ userId, projectId, taskId, memberId }) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const user = await User.findById(userId);
        if(taskId != null){

            await Project.updateOne(
                {_id: projectId},
                {
                    $set: {
                        'tasks.$[elem].members.$[elem1].status': Inprogress
                    }
                },
                {
                    multi: true,
                    arrayFilters: [ { "elem._id": ObjectID(taskId) } , { "elem1.id": memberId } ]
                }
            );

            await User.updateOne(
                { _id: memberId },
                { 
                    $set: {
                        status: Inprogress
                    }
                }
            );

            await Notification.deleteOne(
                { projectId: ObjectID(projectId), taskId: ObjectID(taskId), to: ObjectID(userId), type: 0 },
                // {projectId: projectId, taskId:taskId, to: userId},
            );

            const session = await mongoose.startSession();
            const opts = { session, returnOriginal: false };
            const user_detail = basicDetails(user);
            const notification = new Notification({
                from: userId,
                to: memberId,
                taskId: taskId,
                projectId: projectId,
                message: `The ${user_detail.firstName+` `+user_detail.lastName} asked you to rework.`
            });
            Notification.createCollection();
            notification.save(opts);
        }
        const session = await mongoose.startSession();
        try {
            //await session.startTransaction();
            //await session.commitTransaction();
            await session.endSession();
            return {
                ...response,
                status: responseStatus.success,
                errorMessage: {}
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

// End Task
async function endTask({ userId, projectId, taskId }) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const user = await User.findById(userId);
        if(taskId != null){

            await Project.updateOne(
                {_id: projectId},
                {
                    $set: {
                        'tasks.$[elem].status': Completed
                    }
                },
                {
                    multi: true,
                    arrayFilters: [ { "elem._id": ObjectID(taskId) } ]
                }
            );

            const session = await mongoose.startSession();
            const opts = { session, returnOriginal: false };
        }
        const session = await mongoose.startSession();
        try {
            //await session.startTransaction();
            //await session.commitTransaction();
            await session.endSession();
            return {
                ...response,
                status: responseStatus.success,
                errorMessage: {}
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

// delete Task
async function deleteTask({ userId, projectId, taskId }) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const user = await User.findById(userId);
        if(taskId != null){

            await Project.updateOne(
                {_id: projectId},
                {
                    $set: {
                        'tasks.$[elem]': null
                    }
                },
                {
                    multi: true,
                    arrayFilters: [ { "elem._id": ObjectID(taskId) } ]
                }
            );

            await Project.updateOne(
                {_id: projectId},
                {
                    $pull: {
                        'tasks.$[elem]': null
                    }
                },
                {
                    multi: true,
                    arrayFilters: [ { "elem._id": ObjectID(taskId) } ]
                }
            );

            const session = await mongoose.startSession();
            const opts = { session, returnOriginal: false };
        }
        const session = await mongoose.startSession();
        try {
            //await session.startTransaction();
            //await session.commitTransaction();
            await session.endSession();
            return {
                ...response,
                status: responseStatus.success,
                errorMessage: {}
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

// Remove Member
async function removeMember({ userId, projectId, taskId, memberId }) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const user = await User.findById(userId);
        if(taskId != null){
            await Project.updateOne(
                {_id: projectId},
                {
                    $set: {
                        'tasks.$[elem].members.$[elem1]': null
                    }
                },
                {
                    multi: true,
                    arrayFilters: [ { "elem._id": ObjectID(taskId) } , { "elem1.id": memberId } ]
                }
            );

            await Project.updateOne(
                {_id: projectId},
                {
                    $pull: {
                        'tasks.$[elem].members': null
                    }
                },
                {
                    multi: true,
                    arrayFilters: [ { "elem._id": ObjectID(taskId) } ]
                }
            );

            await User.updateOne(
                { _id: memberId },
                { 
                    $set: {
                        status: Checked
                    }
                }
            );

            await Notification.deleteOne(
                { projectId: ObjectID(projectId), taskId: ObjectID(taskId), to: ObjectID(userId), type: 0 },
            );
            const task = await Project.find(
                { _id: projectId },
                { 
                    tasks: { $elemMatch: { _id: ObjectID(taskId) } }
                });
            var taskMembers = [];
            for (let i = 0; i < task[0].tasks[0].members.length; i++) {
                let member = await User.findById(task[0].tasks[0].members[i].id);
                taskMembers.push(basicDetails(member));
            }
            const session = await mongoose.startSession();
            const opts = { session, returnOriginal: false };
            const user_detail = basicDetails(user);
            const notification = new Notification({
                from: userId,
                to: memberId,
                taskId: taskId,
                projectId: projectId,
                message: `The ${user_detail.firstName+` `+user_detail.lastName} removed you in member list.`
            });
            Notification.createCollection();
            notification.save(opts);
            try {
                //await session.startTransaction();
                //await session.commitTransaction();
                await session.endSession();
                return {
                    ...response,
                    status: responseStatus.success,
                    data : taskMembers,
                    errorMessage: {}
                };
            } catch (error) {
                //await session.abortTransaction();
                await session.endSession();
                throw error;
            }
        } else {
            const session = await mongoose.startSession();
            await Project.updateOne(
                {_id: projectId},
                {
                    $set: {
                        superintendent: []
                    }
                }
            );

            await User.updateOne(
                { _id: memberId },
                { 
                    $set: {
                        status: Checked
                    }
                }
            );

            try {
                //await session.startTransaction();
                //await session.commitTransaction();
                await session.endSession();
                return {
                    ...response,
                    status: responseStatus.success,
                    data : [],
                    errorMessage: {}
                };
            } catch (error) {
                //await session.abortTransaction();
                await session.endSession();
                throw error;
            }
        }
    }
    catch (error) {
        throw error;
    }
};

// cancel Task
async function cancelTask({ userId, projectId, taskId }) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const user = await User.findById(userId);
        var taskMembers = [];
        if(taskId != null){
            await Project.updateOne(
                {_id: projectId},
                {
                    $set: {
                        'tasks.$[elem].status': Inprogress
                    }
                },
                {
                    multi: true,
                    arrayFilters: [ { "elem._id": { $eq: ObjectID(taskId)} } ]
                }
            );

            await Notification.deleteOne(
                { projectId: ObjectID(projectId), taskId: ObjectID(taskId), from: ObjectID(engineerId), to: ObjectID(userId), type: 0 },
                // {projectId: projectId, taskId:taskId, to: userId},
            );

            const task = await Project.find(
                { _id: projectId }, 
                { 
                    tasks: { $elemMatch: { _id: new ObjectID(taskId) } },
                } 
            );
            var engineerId = null;

            if(task && task[0] && task[0].tasks[0]){
                engineerId = task[0].tasks[0].engineers[0].id;
            }

            const session = await mongoose.startSession();
            const opts = { session, returnOriginal: false };
            const user_detail = basicDetails(user);
            const notification = new Notification({
                from: userId,
                to: engineerId,
                taskId: taskId,
                projectId: projectId,
                message: `The ${user_detail.firstName+` `+user_detail.lastName} cancelled task you invited.`
            });
            Notification.createCollection();
            notification.save(opts);
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

// clear Notification
async function clearNotification({ userId, projectId, taskId }) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        const user = await User.findById(userId);
        if(taskId != null){
            await Notification.deleteOne(
                { projectId: ObjectID(projectId), taskId: ObjectID(taskId), to: ObjectID(userId), type: 0 }
            );
        }
        const session = await mongoose.startSession();
        try {
            //await session.startTransaction();
            //await session.commitTransaction();
            await session.endSession();
            return {
                ...response,
                status: responseStatus.success,
                errorMessage: {}
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
            await User.updateOne(
                { _id: memberIds[i] },
                { 
                    $set: {
                        status: NotStart
                    }
                }
            );
        }
        await Project.updateOne(
            { _id: projectId },
            {
                $push: {
                    "tasks.$[elem].members": { $each: members }
                },
                $set: {
                    "tasks.$[elem].status": Created
                }
            },
            {
                multi: true,
                arrayFilters: [ { "elem._id": { $eq: ObjectID(taskId)} } ]
            }
        )
        const task = await Project.find(
                { _id: projectId },
                { 
                    tasks: { $elemMatch: { _id: ObjectID(taskId) } }
                });
                          
        for (let i = 0; i < task[0].tasks[0].members.length; i++) {
            let member = await User.findById(task[0].tasks[0].members[i].id);
            taskMembers.push(basicDetails(member));
        }
        
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
        const task = await Project.find(
                { _id: projectId },
                { 
                    tasks: { $elemMatch: { _id: ObjectID(taskId) } }
                });
        if(task[0].tasks[0].engineers.length == 0){
            await Project.updateOne(
                { _id: projectId },
                {
                    $push: {
                        "tasks.$[elem].engineers": { $each: engineers }
                    },
                    $set: {
                        "tasks.$[elem].status": Created
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
                message: "The Superintendent invited you to the project as an engineer."
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
        const project = await Project.findById(projectId);
        const notifications = await Notification.find({to: userId, projectId: projectId, isRead: false});

        for(i = 0 ; i < notifications.length; i++){
            const from = await User.findById(notifications[i].from);

            const task = await Project.find(
                { _id: ObjectID(projectId) },
                { 
                    tasks: { $elemMatch: { _id: notifications[i].taskId } }
                }
                );
            const fromUserDetail = basicDetails(from);
            var item = {
                count: notifications[i].count,
                createdOn: notifications[i].createdOn.toISOString().split('T')[0],
                message: notifications[i].message,
                firstName: fromUserDetail.firstName,
                lastName: fromUserDetail.lastName,
                photo: fromUserDetail.photo,
                mobile: fromUserDetail.mobile,
                role: fromUserDetail.role,
                taskId: notifications[i].taskId,
                taskName: task[0].tasks[0].name,
                coverImage: project.coverImage ? `${config.assetsBaseUrl}/${project.coverImage}` : null
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

// Get Task Messages
async function getTaskMessages({ userId, projectId, taskId }) {
    var response = {
        status: responseStatus.failure,
        errorMessage: {}
    };
    try {
        let data = [];
        const notifications = await Notification.find(
            { projectId: projectId, taskId: taskId, isRead: false, type: 1 }
        ).sort( { createdOn: 1 } );
        for(i = 0 ; i < notifications.length; i++){

            const from = await User.findById(notifications[i].from);

            const fromUserDetail = basicDetails(from);

            const item = {
                from: notifications[i].from,
                to: notifications[i].to,
                myId: new ObjectID(userId),
                count: notifications[i].count,
                createdOn: notifications[i].createdOn,
                message: notifications[i].message,
                firstName: fromUserDetail.firstName,
                lastName: fromUserDetail.lastName,
                photo: fromUserDetail.photo,
                mobile: fromUserDetail.mobile,
                role: fromUserDetail.role,
                taskId: notifications[i].taskId
            };
            data.push(item);
        }

        // console.log("item", data);
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
    reviewTask,
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
    getTaskMembers,
    startTask,
    submitForCheckingTask,
    cancelTask,
    checkTask,
    reworkTask,
    deleteTask,
    removeMember,
    clearNotification,
    postMessage,
    getTaskMessages,
    endTask,
    getTaskHistory,
    deleteProject,
    updateProject,
    getProjectSuperintendents,
    getMemberProfile,
    changeUserRole,
    leaveFeedback,
    getFeedbacks,
    endProject
};