import {
    MODEL_UPLOAD_SUCCESS,
    COVER_UPLOAD_SUCCESS,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_REQUEST,
    GET_PROJECT_DETAIL_SUCCESS,
    GET_PROJECT_DETAIL_FAILURE,
    GET_FORGE_TOKEN_SUCCESS,
    GET_USERS_SUCCESS,
    GET_FORGE_TOKEN_FAILURE,
    GET_USERS_FAILURE,
    GET_SUPERINTENDENTS_SUCCESS,
    GET_SUPERINTENDENTS_FAILURE,
    GET_ENGINEERS_SUCCESS,
    GET_ENGINEERS_FAILURE,
    GET_MEMBERS_SUCCESS,
    GET_MEMBERS_FAILURE,
    GET_TASKS_SUCCESS,
    GET_TASKS_FAILURE
} from "../types";
const initialState = {
    cover_path: null,
    model_path: null,
    projects : [],
    progress: 0,
    superintendents: [],
    engineers: [],
    members: [],
    tasks:{}
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
        case GET_PROJECT_DETAIL_SUCCESS:
            return {
                ...state,
                project: action.payload.data,
            };
        case GET_PROJECT_DETAIL_FAILURE:
            return {
                ...state,
                project: [],
            };                
        case GET_FORGE_TOKEN_SUCCESS:
            return {
                ...state,
                forgeToken: action.payload,
            };
        case GET_FORGE_TOKEN_FAILURE:
            return {
                ...state,
                forgeToken: action.payload,
            };
        case GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
            };
        case GET_USERS_FAILURE:
            return {
                ...state,
                users: [],
            };
        case GET_ENGINEERS_SUCCESS:
            console.log(action.payload);
            return {
                ...state,
                engineers: action.payload,
            };
        case GET_ENGINEERS_FAILURE:
            return {
                ...state,
                engineers: [],
            };
        case GET_SUPERINTENDENTS_SUCCESS:
            return {
                ...state,
                superintendents: action.payload,
            };
        case GET_SUPERINTENDENTS_FAILURE:
            return {
                ...state,
                superintendents: [],
            };
        case GET_MEMBERS_SUCCESS:
            return {
                ...state,
                members: action.payload,
            };
        case GET_MEMBERS_FAILURE:
            return {
                ...state,
                members: [],
            };
        case GET_TASKS_SUCCESS:
            return {
                ...state,
                tasks: action.payload.tasks,
            };
        case GET_TASKS_FAILURE:
            return {
                ...state,
                tasks: {},
            };
        default:
            return state;
    }
}