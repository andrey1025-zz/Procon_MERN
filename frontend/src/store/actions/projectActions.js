import {
    ADD_PROJECT_REQUEST,
    ADD_PROJECT_SUCCESS,
    ADD_PROJECT_FAILURE
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
        // dispatch({
        //     type: ADD_PROJECT_SUCCESS,
        //     payload: response.data.tempPhotoId
        // });
        // setSubmitting(false);
    } else if (response.data && response.data.status === 'failure') {
        // dispatch({
        //     type: ADD_PROJECT_FAILURE,
        //     payload: response.data
        // })
        // setSubmitting(false);

    }
};