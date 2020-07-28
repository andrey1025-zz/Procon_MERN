import {
    LOGOUT_SUCCESS,
    LOGIN_SUCCESS,
    REFRESH_TOKEN_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    FETCH_USER_PROFILE_REQUEST,
    FETCH_USER_PROFILE_SUCCESS,
    FETCH_USER_PROFILE_FAILURE,
    UPDATE_PROFILE_SUCCESS,
} from "../types";

const initialState = {
    token: getToken(),
    user: getUser(),
    profile: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                token: null,
                user: null
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                user: null,
                token: null
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user
            };
        case REFRESH_TOKEN_SUCCESS: {
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user
            };
        };
        case FETCH_USER_PROFILE_REQUEST:
            return {
                ...state,
                profile: null
            };
        case FETCH_USER_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.payload
            };
        case FETCH_USER_PROFILE_FAILURE:
            return {
                ...state,
                profile: null
            };
        case UPDATE_PROFILE_SUCCESS: {
            const updatedUser = {
                ...state.user,
                photo: action.payload.photo
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            return {
                ...state,
                profile: action.payload,
                user: updatedUser
            };
        }
        default:
            return state;
    }
};

function getUser() {
    try {
        if (localStorage.getItem('user'))
            return JSON.parse(localStorage.getItem('user'))
        return null;
    } catch (e) {
        localStorage.removeItem('user');
        return null;
    }
}

function getToken() {
    try {
        if (localStorage.getItem('token'))
            return localStorage.getItem('token');
        return null;
    } catch (e) {
        localStorage.removeItem('token');
        return null;
    }
}