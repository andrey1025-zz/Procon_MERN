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
    GET_TASK_ENGINEERS_REQUEST,
    GET_TASK_ENGINEERS_SUCCESS,
    GET_TASK_ENGINEERS_FAILURE,
    GET_TASK_MEMBERS_REQUEST,
    GET_TASK_MEMBERS_SUCCESS,
    GET_TASK_MEMBERS_FAILURE,
} from '../types';
import api from '../../api';

export const addProject = (data, setErrors, setSubmitting) => async dispatch => {
    setSubmitting(true);
    dispatch({
        type: ADD_PROJECT_REQUEST
    });
    
    const response = await api.post('/project/add-new-project', data);    
    if (response.data && response.data.status === 'success') {
        dispatch({
            type: ADD_PROJECT_SUCCESS,
            payload: response.data.path
        });
    } else {
        dispatch({
            type: ADD_PROJECT_FAILURE,
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