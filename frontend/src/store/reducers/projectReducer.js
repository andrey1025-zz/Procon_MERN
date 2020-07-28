import {
    MODEL_UPLOAD_SUCCESS,
    COVER_UPLOAD_SUCCESS,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_REQUEST
} from "../types";
const initialState = {
    cover_path: null,
    model_path: null,
    projects : [],
    progress: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case MODEL_UPLOAD_SUCCESS:
            return {
                ...state,
                model_path: action.payload,
                progress: 0
            };
        
        case COVER_UPLOAD_SUCCESS:
            return {
                ...state,
                cover_path: action.payload,
                progress: 0
            };
        case GET_PROJECT_SUCCESS:
            return {
                ...state,
                projects: action.payload,
            };
        case GET_PROJECT_REQUEST:
            return {
                ...state,
                projects: [],
            };                
        default:
            return state;
    }
}