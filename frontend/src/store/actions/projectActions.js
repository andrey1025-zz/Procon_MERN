import {
    ADD_PROJECT_REQUEST,
    ADD_PROJECT_SUCCESS,
    ADD_PROJECT_FAILURE,
    GET_PROJECT_REQUEST,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_FAILURE,
    COVER_UPLOAD_PROGRESS,
    COVER_UPLOAD_FAILURE,
    COVER_UPLOAD_REQUEST,
    COVER_UPLOAD_SUCCESS,
    MODEL_UPLOAD_PROGRESS,
    MODEL_UPLOAD_FAILURE,
    MODEL_UPLOAD_REQUEST,
    MODEL_UPLOAD_SUCCESS,
    GET_PROJECT_DETAIL_REQUEST,
    GET_PROJECT_DETAIL_SUCCESS,
    GET_PROJECT_DETAIL_FAILURE,
    ADD_TASK_REQUEST,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAILURE,
    EDIT_TASK_REQUEST,
    EDIT_TASK_SUCCESS,
    EDIT_TASK_FAILURE,
    GET_FORGE_TOKEN_REQUEST,
    GET_FORGE_TOKEN_SUCCESS,
    GET_FORGE_TOKEN_FAILURE,
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
    GET_SUPERINTENDENTS_REQUEST,
    GET_SUPERINTENDENTS_SUCCESS,
    GET_SUPERINTENDENTS_FAILURE,
    GET_ENGINEERS_REQUEST,
    GET_ENGINEERS_SUCCESS,
    GET_ENGINEERS_FAILURE,
    GET_MEMBERS_REQUEST,
    GET_MEMBERS_SUCCESS,
    GET_MEMBERS_FAILURE,
    GET_TASKS_REQUEST,
    GET_TASKS_SUCCESS,
    GET_TASKS_FAILURE,
    INVITE_SUPERINTENDENT_REQUEST,
    INVITE_SUPERINTENDENT_SUCCESS,
    INVITE_SUPERINTENDENT_FAILURE,
    INVITE_ENGINEER_REQUEST,
    INVITE_ENGINEER_SUCCESS,
    INVITE_ENGINEER_FAILURE,
    INVITE_MEMBER_REQUEST,
    INVITE_MEMBER_SUCCESS,
    INVITE_MEMBER_FAILURE,
    GET_NOTIFICATION_COUNT_REQUEST,
    GET_NOTIFICATION_COUNT_SUCCESS,
    GET_NOTIFICATION_COUNT_FAILURE,
    GET_NOTIFICATIONS_REQUEST,
    GET_NOTIFICATIONS_SUCCESS,
    GET_NOTIFICATIONS_FAILURE,
    GET_TASK_ENGINEERS_REQUEST,
    GET_TASK_ENGINEERS_SUCCESS,
    GET_TASK_ENGINEERS_FAILURE,
    GET_TASK_MEMBERS_REQUEST,
    GET_TASK_MEMBERS_SUCCESS,
    GET_TASK_MEMBERS_FAILURE,
    GET_TASK_DETAIL_FAILURE,
    GET_TASK_DETAIL_SUCCESS,
    GET_TASK_DETAIL_REQUEST,
    REVIEW_TASK_REQUEST,
    REVIEW_TASK_FAILURE,
    REVIEW_TASK_SUCCESS,
    START_TASK_REQUEST,
    START_TASK_SUCCESS,
    START_TASK_FAILURE,
    CANCEL_TASK_REQUEST,
    CANCEL_TASK_SUCCESS,
    CANCEL_TASK_FAILURE,
    CLEAR_NOTIFICATION_REQUEST,
    CLEAR_NOTIFICATION_SUCCESS,
    CLEAR_NOTIFICATION_FAILURE,
    POST_MESSAGE_REQUEST,
    POST_MESSAGE_SUCCESS,
    POST_MESSAGE_FAILURE,
    GET_TASK_MESSAGES_REQUEST,
    GET_TASK_MESSAGES_SUCCESS,
    GET_TASK_MESSAGES_FAILURE,
    SUBMIT_FOR_CHECKING_TASK_REQUEST,
    SUBMIT_FOR_CHECKING_TASK_SUCCESS,
    SUBMIT_FOR_CHECKING_TASK_FAILURE,
    CHECK_TASK_REQUEST,
    CHECK_TASK_SUCCESS,
    CHECK_TASK_FAILURE,
    REWORK_TASK_REQUEST,
    REWORK_TASK_SUCCESS,
    REWORK_TASK_FAILURE,
    REMOVE_MEMBER_REQUEST,
    REMOVE_MEMBER_SUCCESS,
    REMOVE_MEMBER_FAILURE,
    GET_TASK_HISTORY_REQUEST,
    GET_TASK_HISTORY_SUCCESS,
    GET_TASK_HISTORY_FAILURE,
    DELETE_TASK_REQUEST,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_FAILURE,
    DELETE_PROJECT_REQUEST,
    DELETE_PROJECT_SUCCESS,
    DELETE_PROJECT_FAILURE,
    UPDATE_PROJECT_REQUEST,
    UPDATE_PROJECT_SUCCESS,
    UPDATE_PROJECT_FAILURE,
    GET_PROJECT_SUPERINTENDENTS_REQUEST,
    GET_PROJECT_SUPERINTENDENTS_SUCCESS,
    GET_PROJECT_SUPERINTENDENTS_FAILURE,
    END_TASK_REQUEST,
    END_TASK_SUCCESS,
    END_TASK_FAILURE,
    GET_MEMBER_PROFILE_REQUEST,
    GET_MEMBER_PROFILE_SUCCESS,
    GET_MEMBER_PROFILE_FAILURE,
    CHANGE_USER_ROLE_REQUEST,
    CHANGE_USER_ROLE_SUCCESS,
    CHANGE_USER_ROLE_FAILURE,
    LEAVE_FEEDBACK_REQUEST,
    LEAVE_FEEDBACK_SUCCESS,
    LEAVE_FEEDBACK_FAILURE,
    GET_FEEDBACKS_REQUEST,
    GET_FEEDBACKS_SUCCESS,
    GET_FEEDBACKS_FAILURE,
    END_PROJECT_REQUEST,
    END_PROJECT_SUCCESS,
    END_PROJECT_FAILURE,
    GET_TASK_FORCOMPONENT_REQUEST,
    GET_TASK_FORCOMPONENT_SUCCESS,
    GET_TASK_FORCOMPONENT_FAILURE
} from '../types';
import api from '../../api';

export const addProject = (data, setErrors, setSubmitting) => async dispatch => {
    setSubmitting(true);
    dispatch({
        type: ADD_PROJECT_REQUEST
    });
    
    const response = await api.post('/project/add-new-project', data);    
    if (response.data && response.data.status === 'success') {
        console.log(response.data);
        dispatch({
            type: ADD_PROJECT_SUCCESS,
            payload: response.data.projects
        });
    } else {
        dispatch({
            type: ADD_PROJECT_FAILURE,
            payload: response.data
        });
    }
};

export const updateProject = (data, setErrors, setSubmitting) => async dispatch => {
    setSubmitting(true);
    dispatch({
        type: UPDATE_PROJECT_REQUEST
    });
    
    const response = await api.post('/project/update-project', data);    
    if (response.data && response.data.status === 'success') {
        dispatch({
            type: UPDATE_PROJECT_SUCCESS,
            payload: response.data.projects
        });
    } else {
        dispatch({
            type: UPDATE_PROJECT_FAILURE,
            payload: response.data
        });
    }
};

export const editTask = (data, setErrors, setSubmitting) => async dispatch => {
    setSubmitting(true);
    dispatch({
        type: EDIT_TASK_REQUEST
    });
   
    const response = await api.post('/project/edit-task', data);    
    setSubmitting(false);

    if (response.data && response.data.status === 'success') {
        dispatch({
            type: EDIT_TASK_SUCCESS,
            payload: response.data
        });

    } else {
        dispatch({
            type: EDIT_TASK_FAILURE,
            payload: response.data
        });
    }
};

export const endTask = (data) => async dispatch => {
    dispatch({
        type: END_TASK_REQUEST
    });
   
    const response = await api.post('/project/end-task', data);    

    if (response.data && response.data.status === 'success') {
        dispatch({
            type: END_TASK_SUCCESS,
            payload: response.data
        });

    } else {
        dispatch({
            type: END_TASK_FAILURE,
            payload: response.data
        });
    }
};

export const changeUserRole = (data) => async dispatch => {
    dispatch({
        type: CHANGE_USER_ROLE_REQUEST
    });
   
    const response = await api.post('/project/change-user-role', data);    

    if (response.data && response.data.status === 'success') {
        dispatch({
            type: CHANGE_USER_ROLE_SUCCESS,
            payload: response.data
        });

    } else {
        dispatch({
            type: CHANGE_USER_ROLE_FAILURE,
            payload: response.data
        });
    }
};

export const addTask = (data) => async dispatch => {
    dispatch({
        type: ADD_TASK_REQUEST
    });
   
    const response = await api.post('/project/add-new-task', data);

    if (response.data && response.data.status === 'success') {
        dispatch({
            type: ADD_TASK_SUCCESS,
            payload: response.data
        });

    } else {
        dispatch({
            type: ADD_TASK_FAILURE,
            payload: response.data
        });
    }
};

export const getMemberProfile = (data) => async dispatch => {
    dispatch({
        type: GET_MEMBER_PROFILE_REQUEST
    });
   
    const response = await api.post('/project/member-profile', data);

    if (response.data && response.data.status === 'success') {
        dispatch({
            type: GET_MEMBER_PROFILE_SUCCESS,
            payload: response.data
        });

    } else {
        dispatch({
            type: GET_MEMBER_PROFILE_FAILURE,
            payload: response.data
        });
    }
};

export const reviewTask = (data) => async dispatch => {
    dispatch({
        type: REVIEW_TASK_REQUEST
    });
   
    const response = await api.post('/project/review-task', data);

    if (response.data && response.data.status === 'success') {
        dispatch({
            type: REVIEW_TASK_SUCCESS,
            payload: response.data
        });

    } else {
        dispatch({
            type: REVIEW_TASK_FAILURE,
            payload: response.data
        });
    }
};

export const getProjects = () => async dispatch => {
    dispatch({
        type: GET_PROJECT_REQUEST
    });
    
    const response = await api.post('/project/list');    
    if (response.data && response.data.status === 'success') {
        dispatch({
            type: GET_PROJECT_SUCCESS,
            payload: response.data.projects
        });
    } else {
        dispatch({
            type: GET_PROJECT_FAILURE,
            payload: response.data
        });
    }
};

export const getProjectDetail = (projectId) => async dispatch => {

    let data = {
        projectId: projectId
    };
    dispatch({
        type: GET_PROJECT_DETAIL_REQUEST
    });

    const response = await api.post('/project/detail', data);
    
    if (response.data && response.data.status === 'success') {
        dispatch({
            type: GET_PROJECT_DETAIL_SUCCESS,
            payload: response.data
        });
    } else if (response.data && response.data.status === 'failure') {
        dispatch({
            type: GET_PROJECT_DETAIL_FAILURE,
            payload: response.data
        })
    }
};

export const endProject = (projectId) => async dispatch => {

    let data = {
        projectId: projectId
    };
    dispatch({
        type: END_PROJECT_REQUEST
    });

    const response = await api.post('/project/end-project', data);
    
    if (response.data && response.data.status === 'success') {
        dispatch({
            type: END_PROJECT_SUCCESS,
            payload: response.data
        });
    } else if (response.data && response.data.status === 'failure') {
        dispatch({
            type: END_PROJECT_FAILURE,
            payload: response.data
        })
    }
};

export const deleteProject = (projectId) => async dispatch => {

    let data = {
        projectId: projectId
    };
    dispatch({
        type: DELETE_PROJECT_REQUEST
    });

    const response = await api.post('/project/delete', data);
    
    if (response.data && response.data.status === 'success') {
        dispatch({
            type: DELETE_PROJECT_SUCCESS,
            payload: response.data
        });
    } else if (response.data && response.data.status === 'failure') {
        dispatch({
            type: DELETE_PROJECT_FAILURE,
            payload: response.data
        })
    }
};

export const getTasks = (projectId) => async dispatch => {

    let data = {
        projectId: projectId
    };

    dispatch({
        type: GET_TASKS_REQUEST
    });

    const response = await api.post('/project/tasks', data);

    if (response.data && response.data.status === 'success') {
        dispatch({
            type: GET_TASKS_SUCCESS,
            payload:response.data
        });
    } else if (response.data && response.data.status === 'failure') {
        dispatch({
            type: GET_TASKS_FAILURE,
            payload: response.data
        })
    }
}

export const getTaskforComponent = (data) => async dispatch => {

    dispatch({
        type: GET_TASK_FORCOMPONENT_REQUEST
    });

    const response = await api.post('/project/taskforcomponent', data);

    if (response.data && response.data.status === 'success') {
        dispatch({
            type: GET_TASK_FORCOMPONENT_SUCCESS,
            payload:response.data
        });
    } else if (response.data && response.data.status === 'failure') {
        dispatch({
            type: GET_TASK_FORCOMPONENT_FAILURE,
            payload: response.data
        })
    }
}
export const inviteSuperintendent = (data) => async dispatch => {
    dispatch({
        type: INVITE_SUPERINTENDENT_REQUEST
    });

    const response = await api.post('/project/invite-superintendent', data);
    
    if (response.data && response.data.status === 'success') {
        dispatch({
            type: INVITE_SUPERINTENDENT_SUCCESS,
            payload: response.data
        })
    } else if (response.data && response.data.status === 'failure' ){
        dispatch({
            type: INVITE_SUPERINTENDENT_FAILURE,
            payload: response.data
        })
    }
};

export const inviteEngineer = (data) => async dispatch => {
    dispatch({
        type: INVITE_ENGINEER_REQUEST
    });

    const response = await api.post('/project/invite-engineer', data);
    
    if (response.data && response.data.status === 'success') {
        dispatch({
            type: INVITE_ENGINEER_SUCCESS,
            payload: response.data
        })
    } else if (response.data && response.data.status === 'failure' ){
        dispatch({
            type: INVITE_ENGINEER_FAILURE,
            payload: response.data
        })
    }
};

export const inviteMember = (data) => async dispatch => {
    dispatch({
        type: INVITE_MEMBER_REQUEST
    });

    const response = await api.post('/project/invite-member', data);
    
    if (response.data && response.data.status === 'success') {
        dispatch({
            type: INVITE_MEMBER_SUCCESS,
            payload: response.data
        })
    } else if (response.data && response.data.status === 'failure' ){
        dispatch({
            type: INVITE_MEMBER_FAILURE,
            payload: response.data
        })
    }
};

export const getTaskEngineers = (data) => async dispatch => {
    dispatch({
        type: GET_TASK_ENGINEERS_REQUEST
    });

    const response = await api.post('/project/get-task-engineers', data);
    
    if (response.data && response.data.status === 'success') {
        dispatch({
            type: GET_TASK_ENGINEERS_SUCCESS,
            payload: response.data
        })
    } else if (response.data && response.data.status === 'failure' ){
        dispatch({
            type: GET_TASK_ENGINEERS_FAILURE,
            payload: response.data
        })
    }
};

export const getProjectSuperintendents = (projectId) => async dispatch => {
    let data = {
        projectId: projectId
    };
    dispatch({
        type: GET_PROJECT_SUPERINTENDENTS_REQUEST
    });

    const response = await api.post('/project/get-project-superintendents', data);
    
    if (response.data && response.data.status === 'success') {
        dispatch({
            type: GET_PROJECT_SUPERINTENDENTS_SUCCESS,
            payload: response.data
        })
    } else if (response.data && response.data.status === 'failure' ){
        dispatch({
            type: GET_PROJECT_SUPERINTENDENTS_FAILURE,
            payload: response.data
        })
    }
};

export const getTaskMembers = (data) => async dispatch => {
    dispatch({
        type: GET_TASK_MEMBERS_REQUEST
    });

    const response = await api.post('/project/get-task-members', data);
    
    if (response.data && response.data.status === 'success') {
        dispatch({
            type: GET_TASK_MEMBERS_SUCCESS,
            payload: response.data
        })
    } else if (response.data && response.data.status === 'failure' ){
        dispatch({
            type: GET_TASK_MEMBERS_FAILURE,
            payload: response.data
        })
    }
};

export const getFeedbacks = (data) => async dispatch => {
    dispatch({
        type: GET_FEEDBACKS_REQUEST
    });

    const response = await api.post('/project/get-feedbacks', data);
    
    if (response.data && response.data.status === 'success') {
        dispatch({
            type: GET_FEEDBACKS_SUCCESS,
            payload: response.data
        })
    } else if (response.data && response.data.status === 'failure' ){
        dispatch({
            type: GET_FEEDBACKS_FAILURE,
            payload: response.data
        })
    }
};

export const getTaskDetail = (data) => async dispatch => {
    dispatch({
        type: GET_TASK_DETAIL_REQUEST
    });

    const response = await api.post('/project/task-detail', data);
    
    if (response.data && response.data.status === 'success') {
        dispatch({
            type: GET_TASK_DETAIL_SUCCESS,
            payload: response.data
        })
    } else if (response.data && response.data.status === 'failure' ){
        dispatch({
            type: GET_TASK_DETAIL_FAILURE,
            payload: response.data
        })
    }
};

export const postMessage = (data) => async dispatch => {
    dispatch({
        type: POST_MESSAGE_REQUEST
    });

    const response = await api.post('/project/post-message', data);
    
    if (response.data && response.data.status === 'success') {
        dispatch({
            type: POST_MESSAGE_SUCCESS,
            payload: response.data
        })
    } else if (response.data && response.data.status === 'failure' ){
        dispatch({
            type: POST_MESSAGE_FAILURE,
            payload: response.data
        })
    }
};

export const leaveFeedback = (data) => async dispatch => {
    dispatch({
        type: LEAVE_FEEDBACK_REQUEST
    });

    const response = await api.post('/project/feedback', data);
    
    if (response.data && response.data.status === 'success') {
        dispatch({
            type: LEAVE_FEEDBACK_SUCCESS,
            payload: response.data
        })
    } else if (response.data && response.data.status === 'failure' ){
        dispatch({
            type: LEAVE_FEEDBACK_FAILURE,
            payload: response.data
        })
    }
};

export const startTask = (data) => async dispatch => {
    dispatch({
        type: START_TASK_REQUEST
    });

    const response = await api.post('/project/start-task', data);
    
    if (response.data && response.data.status === 'success') {
        dispatch({
            type: START_TASK_SUCCESS,
            payload: response.data
        })
    } else if (response.data && response.data.status === 'failure' ){
        dispatch({
            type: START_TASK_FAILURE,
            payload: response.data
        })
    }
};

export const checkTask = (data) => async dispatch => {
    dispatch({
        type: CHECK_TASK_REQUEST
    });

    const response = await api.post('/project/check-task', data);
    
    if (response.data && response.data.status === 'success') {
        dispatch({
            type: CHECK_TASK_SUCCESS,
            payload: response.data
        })
    } else if (response.data && response.data.status === 'failure' ){
        dispatch({
            type: CHECK_TASK_FAILURE,
            payload: response.data
        })
    }
};

export const reworkTask = (data) => async dispatch => {
    dispatch({
        type: REWORK_TASK_REQUEST
    });

    const response = await api.post('/project/rework-task', data);
    
    if (response.data && response.data.status === 'success') {
        dispatch({
            type: REWORK_TASK_SUCCESS,
            payload: response.data
        })
    } else if (response.data && response.data.status === 'failure' ){
        dispatch({
            type: REWORK_TASK_FAILURE,
            payload: response.data
        })
    }
};

export const getTaskHistory = (data) => async dispatch => {
    dispatch({
        type: GET_TASK_HISTORY_REQUEST
    });

    const response = await api.post('/project/get-task-history', data);
    
    if (response.data && response.data.status === 'success') {
        dispatch({
            type: GET_TASK_HISTORY_SUCCESS,
            payload: response.data
        })
    } else if (response.data && response.data.status === 'failure' ){
        dispatch({
            type: GET_TASK_HISTORY_FAILURE,
            payload: response.data
        })
    }
};

export const removeMember = (data) => async dispatch => {
    dispatch({
        type: REMOVE_MEMBER_REQUEST
    });
    const response = await api.post('/project/remove-member', data);
    
    if (response.data && response.data.status === 'success') {
        dispatch({
            type: REMOVE_MEMBER_SUCCESS,
            payload: response.data
        })
    } else if (response.data && response.data.status === 'failure' ){
        dispatch({
            type: REMOVE_MEMBER_FAILURE,
            payload: response.data
        })
    }
};

export const deleteTask = (data) => async dispatch => {
    dispatch({
        type: DELETE_TASK_REQUEST
    });

    const response = await api.post('/project/delete-task', data);
    
    if (response.data && response.data.status === 'success') {
        dispatch({
            type: DELETE_TASK_SUCCESS,
            payload: response.data
        })
    } else if (response.data && response.data.status === 'failure' ){
        dispatch({
            type: DELETE_TASK_FAILURE,
            payload: response.data
        })
    }
};

export const submitForCheckingTask = (data) => async dispatch => {
    dispatch({
        type: SUBMIT_FOR_CHECKING_TASK_REQUEST
    });

    const response = await api.post('/project/submit-check-task', data);
    
    if (response.data && response.data.status === 'success') {
        dispatch({
            type: SUBMIT_FOR_CHECKING_TASK_SUCCESS,
            payload: response.data
        })
    } else if (response.data && response.data.status === 'failure' ){
        dispatch({
            type: SUBMIT_FOR_CHECKING_TASK_FAILURE,
            payload: response.data
        })
    }
};

export const cancelTask = (data) => async dispatch => {
    dispatch({
        type: CANCEL_TASK_REQUEST
    });

    const response = await api.post('/project/cancel-task', data);
    
    if (response.data && response.data.status === 'success') {
        dispatch({
            type: CANCEL_TASK_SUCCESS,
            payload: response.data
        })
    } else if (response.data && response.data.status === 'failure' ){
        dispatch({
            type: CANCEL_TASK_FAILURE,
            payload: response.data
        })
    }
};

export const clearNotification = (data) => async dispatch => {
    dispatch({
        type: CLEAR_NOTIFICATION_REQUEST
    });

    const response = await api.post('/project/clear-notification', data);
    
    if (response.data && response.data.status === 'success') {
        dispatch({
            type: CLEAR_NOTIFICATION_SUCCESS,
            payload: response.data
        })
    } else if (response.data && response.data.status === 'failure' ){
        dispatch({
            type: CLEAR_NOTIFICATION_FAILURE,
            payload: response.data
        })
    }
};

export const getUsers = () => async dispatch => {

    dispatch({
        type: GET_USERS_REQUEST
    });

    const response = await api.post('/project/users');
    
    if (response.data && response.data.status === 'success') {
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: response.data
        });
    } else if (response.data && response.data.status === 'failure') {
        dispatch({
            type: GET_USERS_FAILURE,
            payload: response.data
        })
    }
};

export const getSuperintendents = () => async dispatch => {

    dispatch({
        type: GET_SUPERINTENDENTS_REQUEST
    });

    const response = await api.post('/project/superintendents');

    if (response.data && response.data.status === 'success') {
        dispatch({
            type: GET_SUPERINTENDENTS_SUCCESS,
            payload: response.data.superintendents
        });
    } else if (response.data && response.data.status === 'failure') {
        dispatch({
            type: GET_SUPERINTENDENTS_FAILURE,
            payload: response.data.superintendents
        })
    }
};

export const getEngineers = () => async dispatch => {

    dispatch({
        type: GET_ENGINEERS_REQUEST
    });

    const response = await api.post('/project/engineers');
    
    if (response.data && response.data.status === 'success') {
        dispatch({
            type: GET_ENGINEERS_SUCCESS,
            payload: response.data.engineers
        });
    } else if (response.data && response.data.status === 'failure') {
        dispatch({
            type: GET_ENGINEERS_FAILURE,
            payload: response.data.engineers
        })
    }
};

export const getMembers = () => async dispatch => {

    dispatch({
        type: GET_MEMBERS_REQUEST
    });

    const response = await api.post('/project/members');
    
    if (response.data && response.data.status === 'success') {
        dispatch({
            type: GET_MEMBERS_SUCCESS,
            payload: response.data.members
        });
    } else if (response.data && response.data.status === 'failure') {
        dispatch({
            type: GET_MEMBERS_FAILURE,
            payload: response.data.members
        })
    }
};

export const getViewerForgeToken = () => async dispatch => {

    dispatch({
        type: GET_FORGE_TOKEN_REQUEST
    });

    const response = await api.post('/project/get-forge-token');
    if (response.data && response.status === 200) {
        dispatch({
            type: GET_FORGE_TOKEN_SUCCESS,
            payload: response.data
        });
    } else if (response.data && response.data.status === 'failure') {
        dispatch({
            type: GET_FORGE_TOKEN_FAILURE,
            payload: response.data
        })
    }
};

export const uploadCoverImage = (coverImage, url) => async dispatch => {
    dispatch({
        type: COVER_UPLOAD_REQUEST
    });
    const data = new FormData();
    data.append('cover_file', coverImage);
    const response = await api.post(url, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
            let progress = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total));
            dispatch({
                type: COVER_UPLOAD_PROGRESS,
                progress: progress
            })
        }
    });
    if (response.data && response.data.status === 'success') {
        dispatch({
            type: COVER_UPLOAD_SUCCESS,
            payload: response.data.path
        });
    } else if (response.data && response.data.status === 'failure') {
        dispatch({
            type: COVER_UPLOAD_FAILURE,
            payload: response.data
        })
    }
};

export const uploadModel = (model, url) => async dispatch => {
    dispatch({
        type: MODEL_UPLOAD_REQUEST
    });

    const data = new FormData();
    data.append('model_file', model);
    const response = await api.post(url, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
            let progress = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total));
            dispatch({
                type: MODEL_UPLOAD_PROGRESS,
                progress: progress
            })
        }
    });

    if (response.data && response.data.status === 'success') {
        dispatch({
            type: MODEL_UPLOAD_SUCCESS,
            payload: response.data.path
        });
    } else if (response.data && response.data.status === 'failure') {
        dispatch({
            type: MODEL_UPLOAD_FAILURE,
            payload: response.data
        })
    }
}

export const getNotificationCount = (projectId) => async dispatch => {
    let data = {
        projectId: projectId
    }

    dispatch({
        type: GET_NOTIFICATION_COUNT_REQUEST
    });

    const response = await api.post('/project/get-notification-count', data);
    if (response.data && response.status === 200) {
        dispatch({
            type: GET_NOTIFICATION_COUNT_SUCCESS,
            payload: response.data
        });
    } else if (response.data && response.data.status === 'failure') {
        dispatch({
            type: GET_NOTIFICATION_COUNT_FAILURE,
            payload: response.data
        })
    }
};

export const getNotifications = (projectId) => async dispatch => {
    let data = {
        projectId: projectId
    }

    dispatch({
        type: GET_NOTIFICATIONS_REQUEST
    });

    const response = await api.post('/project/get-notifications', data);
    if (response.data && response.status === 200) {
        dispatch({
            type: GET_NOTIFICATIONS_SUCCESS,
            payload: response.data
        });
    } else if (response.data && response.data.status === 'failure') {
        dispatch({
            type: GET_NOTIFICATIONS_FAILURE,
            payload: response.data
        })
    }
};

export const getTaskMessages = (data) => async dispatch => {
    dispatch({
        type: GET_TASK_MESSAGES_REQUEST
    });

    const response = await api.post('/project/get-messages', data);
    if (response.data && response.status === 200) {
        dispatch({
            type: GET_TASK_MESSAGES_SUCCESS,
            payload: response.data
        });
    } else if (response.data && response.data.status === 'failure') {
        dispatch({
            type: GET_TASK_MESSAGES_FAILURE,
            payload: response.data
        })
    }
};