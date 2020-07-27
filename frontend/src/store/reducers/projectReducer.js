import {
    MODEL_UPLOAD_SUCCESS,
    COVER_UPLOAD_SUCCESS
} from "../types";
const initialState = {
    cover_path: null,
    model_path: null,
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
            
        default:
            return state;
    }
}