import {
    PHOTO_UPLOAD_REQUEST,
    PHOTO_UPLOAD_PROGRESS,
    PHOTO_UPLOAD_SUCCESS,
    PHOTO_UPLOAD_FAILURE
} from '../types';
import api from '../../api';

export const uploadPhoto = (photo, url) => async dispatch => {
    dispatch({
        type: PHOTO_UPLOAD_REQUEST
    });
    const data = new FormData();
    data.append('photo', photo);
    const response = await api.post(url, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
            let progress = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total));
            dispatch({
                type: PHOTO_UPLOAD_PROGRESS,
                progress: progress
            })
        }
    });
    if (response.data && response.data.status === 'success') {
        dispatch({
            type: PHOTO_UPLOAD_SUCCESS,
            payload: response.data.tempPhotoId
        });
    } else if (response.data && response.data.status === 'failure') {
        dispatch({
            type: PHOTO_UPLOAD_FAILURE,
            payload: response.data
        })
    }
};