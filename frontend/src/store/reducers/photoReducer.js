import {
    PHOTO_UPLOAD_REQUEST,
    PHOTO_UPLOAD_PROGRESS,
    PHOTO_UPLOAD_SUCCESS,
    PHOTO_UPLOAD_FAILURE,
    REMOVE_UPLOADED_PHOTO,
} from "../types";
const initialState = {
    tempPhotoId: null,
    progress: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case PHOTO_UPLOAD_REQUEST:
            return {
                ...state,
                tempPhotoId: null,
                progress: 0
            };
        case PHOTO_UPLOAD_PROGRESS:
            return {
                ...state,
                progress: action.progress,
            };
        case PHOTO_UPLOAD_SUCCESS:
            return {
                ...state,
                tempPhotoId: action.payload,
            };
        case PHOTO_UPLOAD_FAILURE:
            return {
                ...state,
                tempPhotoId: null,
            };
        case REMOVE_UPLOADED_PHOTO: {
            return {
                ...state,
                tempPhotoId: null
            }
        }
        default:
            return state;
    }
}