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

    const response = await api.post('/project/add-new-project', data);
    if (response.data.status === "success") {
        const { profile } = response.data;
        dispatch({
            type: ADD_PROJECT_SUCCESS,
            payload: profile
        });
    } else {
        dispatch({
            type: ADD_PROJECT_FAILURE,
            payload: response.data
        });
    }
    // const response = await api.post('/project/add-new-project', data, {
    //     headers: {
    //         'Content-Type': 'multipart/form-data',
    //     },
    //     onUploadProgress: (progressEvent) => {
    //         let progress = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total));
    //         dispatch({
    //             type: ADD_PROJECT_PROGRESS,
    //             progress: progress
    //         })
    //     }
    // });
    // if (response.data && response.data.status === 'success') {
    //     // dispatch({
    //     //     type: ADD_PROJECT_SUCCESS,
    //     //     payload: response.data.tempPhotoId
    //     // });
    //     // setSubmitting(false);
    // } else if (response.data && response.data.status === 'failure') {
    //     // dispatch({
    //     //     type: ADD_PROJECT_FAILURE,
    //     //     payload: response.data
    //     // })
    //     // setSubmitting(false);

    // }
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
<<<<<<< HEAD
                type: ADD_PROJECT_REQUEST,
                progress: progress
            })
        }
    });    
=======
                type: COVER_UPLOAD_PROGRESS,
                progress: progress
            })
        }
    });

>>>>>>> 33abfb81a4bb52bfe38eaf8d2eb88f7d7433a66f
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
};