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

export const addTask = (data, setErrors, setSubmitting) => async dispatch => {
    setSubmitting(true);
    dispatch({
        type: ADD_TASK_REQUEST
    });
   
    const response = await api.post('/project/add-new-task', data);    
    setSubmitting(false);

    if (response.data && response.data.status === 'success') {
        dispatch({
            type: ADD_TASK_SUCCESS,
            payload: response.data.tasks
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
    dispatch({
        type: GET_PROJECT_DETAIL_REQUEST
    });
    
    const data = new FormData();
    data.append('projectId', projectId);
    const response = await api.post('/project/detail', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
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
