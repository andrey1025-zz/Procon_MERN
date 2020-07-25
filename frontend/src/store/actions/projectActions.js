import {
    ADD_PROJECT_REQUEST,
    ADD_PROJECT_SUCCESS,
    ADD_PROJECT_FAILURE
} from '../types';
import api from '../../api';

export const addProject = (data, setErrors, setSubmitting) => async dispatch => {
    setSubmitting(true);
    dispatch({
        type: ADD_PROJECT_REQUEST
    });
    setSubmitting(false);
    console.log(data);

    const response = await api.post('/project/add-new-project', data);
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