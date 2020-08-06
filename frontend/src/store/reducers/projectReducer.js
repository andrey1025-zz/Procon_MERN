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
    GET_TASKS_FAILURE,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAILURE,
    INVITE_ENGINEER_SUCCESS,
    INVITE_ENGINEER_FAILURE,
    GET_NOTIFICATION_COUNT_SUCCESS,
    GET_NOTIFICATION_COUNT_FAILURE,
    GET_TASK_ENGINEERS_SUCCESS,
    GET_TASK_ENGINEERS_FAILURE,
    GET_TASK_MEMBERS_SUCCESS,
    GET_TASK_MEMBERS_FAILURE
} from "../types";
const initialState = {
    cover_path: null,
    model_path: null,
    projects : [],
    progress: 0,
    superintendents: [],
    engineers: [],
    members: [],
    tasks:{},
    taskId: null,
    taskEngineers: [],
    taskMembers: [],
    notificCount: 0
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
        case ADD_TASK_SUCCESS:
            return {
                ...state,
                taskId: action.payload.taskId,
            };
        case ADD_TASK_FAILURE:
            return {
                ...state,
                taskId: null,
            };
        case GET_TASK_ENGINEERS_SUCCESS:
            return {
                ...state,
                taskEngineers: action.payload.data,
            };
        case GET_TASK_ENGINEERS_FAILURE:
            return {
                ...state,
                taskEngineers: [],
            };
        case INVITE_ENGINEER_SUCCESS:
            return {
                ...state,
                taskEngineers: action.payload.data,
            };
        case INVITE_ENGINEER_FAILURE:
            return {
                ...state,
                taskEngineers: [],
            };
        case GET_TASK_MEMBERS_SUCCESS:
            return {
                ...state,
                taskMembers: action.payload.data,
            };
        case GET_TASK_MEMBERS_FAILURE:
            return {
                ...state,
                taskMembers: [],
            };
        case GET_NOTIFICATION_COUNT_SUCCESS:
            return {
                ...state,
                notificCount: action.payload.data,
            };
        case GET_NOTIFICATION_COUNT_FAILURE:
            return {
                ...state,
                notificCount: 0,
            };
        default:
            return state;
    }
}