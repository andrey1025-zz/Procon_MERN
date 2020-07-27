import {
    ADD_PROJECT_REQUEST,
<<<<<<< HEAD
    ADD_PROJECT_PROGRESS,
=======
>>>>>>> aa1facda977bc8f89d0f2583725507b5c6651ab0
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

export const addProject = (data, setErrors, setSubmitting) => async dispatch => {
    setSubmitting(true);
    dispatch({
        type: ADD_PROJECT_REQUEST
<<<<<<< HEAD
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
                type: COVER_UPLOAD_PROGRESS,
                progress: progress
            })
        }
=======
>>>>>>> aa1facda977bc8f89d0f2583725507b5c6651ab0
    });
    setSubmitting(false);
    console.log(data);

    const response = await api.post('/project/add-new-project', data);
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