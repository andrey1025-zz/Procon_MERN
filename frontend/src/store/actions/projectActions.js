import {
    ADD_PROJECT_REQUEST,
      ADD_PROJECT_PROGRESS,
    ADD_PROJECT_SUCCESS,
    ADD_PROJECT_FAILURE,
    COVER_UPLOAD_PROGRESS,
    COVER_UPLOAD_FAILURE,
    COVER_UPLOAD_REQUEST,
    COVER_UPLOAD_SUCCESS,
    MODEL_UPLOAD_PROGRESS,
    MODEL_UPLOAD_FAILURE,
    MODEL_UPLOAD_REQUEST,
    MODEL_UPLOAD_SUCCESS
} from '../types';
import api from '../../api';

export const addProject = (project, setErrors, setSubmitting) => async dispatch => {
    setSubmitting(true);
    dispatch({
        type: ADD_PROJECT_REQUEST
    });
    setSubmitting(false);
    console.log(project);
    const data = new FormData();
    data.append('project', project);
    console.log(data);

    const response = await api.post('/project/add-new-project', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
            let progress = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total));
            dispatch({
                type: ADD_PROJECT_REQUEST,
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
