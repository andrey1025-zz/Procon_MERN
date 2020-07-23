import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE,
    FETCH_USER_PROFILE_REQUEST,
    FETCH_USER_PROFILE_SUCCESS,
    FETCH_USER_PROFILE_FAILURE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    FORGET_PASSWORD_REQUEST,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_FAILURE,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE
} from '../types';
import api from '../../api';
import history from '../../history';

export const register = (data, setErrors, setSubmitting) => async dispatch => {
    setSubmitting(true);
    dispatch({
        type: REGISTER_REQUEST
    });
    const response = await api.post('/auth/register', data);
    setSubmitting(false);
    if (response.data.status === "success") {
        const { token, user } = response.data;
        dispatch({
            type: REGISTER_SUCCESS,
            payload: { token, user }
        });
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
    } else {
        setErrors(response.data.errorMessage);
        dispatch({
            type: REGISTER_FAILURE,
            payload: response.data
        });
    }
};

export const login = (data, setErrors, setSubmitting) => async dispatch => {
    setSubmitting(true);
    dispatch({
        type: LOGIN_REQUEST
    });
    const response = await api.post('/auth/login', data);
    setSubmitting(false);
    if (response.data.status === "success") {
        const { token, user } = response.data;
        dispatch({
            type: LOGIN_SUCCESS,
            payload: { token, user }
        });
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
    } else {
        setErrors(response.data.errorMessage);
        dispatch({
            type: LOGIN_FAILURE,
            payload: response.data
        });
    }
};

export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT_REQUEST
    });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({
        type: LOGOUT_SUCCESS
    });
    //#region temp
    // const refreshToken = Cookies.get('refreshToken');
    // if (!refreshToken) {
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("user");
    //     dispatch({
    //         type: LOGOUT_SUCCESS
    //     });
    //     return;
    // }
    // const response = await api.post('/auth/logout', { token: refreshToken });
    // if (response.data.status === "success") {
    //     dispatch({
    //         type: LOGOUT_SUCCESS,
    //         payload: response.data
    //     });
    //     Cookies.remove('refreshToken');
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("user");
    // } else {
    //     dispatch({
    //         type: LOGOUT_FAILURE,
    //         payload: response.data
    //     });
    // }
    //#endregion
};

export const changePassword = (data, setErrors, setSubmitting, redirectTo) => async dispatch => {
    setSubmitting(true);
    dispatch({
        type: CHANGE_PASSWORD_REQUEST
    });
    const response = await api.post('/auth/change-password', data);
    setSubmitting(false);
    if (response.data.status === "success") {
        dispatch({
            type: CHANGE_PASSWORD_SUCCESS
        });
        history.push(redirectTo);
    } else {
        setErrors(response.data.errorMessage);
        dispatch({
            type: CHANGE_PASSWORD_FAILURE,
            payload: response.data
        });
    }
};

export const getUserProfile = (data) => async dispatch => {
    dispatch({
        type: FETCH_USER_PROFILE_REQUEST
    });
    const response = await api.post('/auth/profile', data);
    if (response.data.status === "success") {
        const { profile } = response.data;
        dispatch({
            type: FETCH_USER_PROFILE_SUCCESS,
            payload: profile
        });
    } else {
        dispatch({
            type: FETCH_USER_PROFILE_FAILURE,
            payload: response.data
        });
    }
};

export const updateProfile = (data, setErrors, setSubmitting) => async dispatch => {
    setSubmitting(true);
    dispatch({
        type: UPDATE_PROFILE_REQUEST
    });
    const response = await api.post('/auth/update-profile', data);
    setSubmitting(false);
    if (response.data.status === "success") {
        const { profile } = response.data;
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: profile
        });
    } else {
        setErrors(response.data.errorMessage);
        dispatch({
            type: UPDATE_PROFILE_FAILURE,
            payload: response.data
        });
    }
};

export const forgetPassword = (data, setErrors, setSubmitting, redirectTo) => async dispatch => {
    setSubmitting(true);
    dispatch({
        type: FORGET_PASSWORD_REQUEST
    });
    const response = await api.post('/auth/forget-password', data);
    setSubmitting(false);
    if (response.data.status === "success") {
        dispatch({
            type: FORGET_PASSWORD_SUCCESS
        });
        history.push(redirectTo)
    } else {
        setErrors(response.data.errorMessage);
        dispatch({
            type: FORGET_PASSWORD_FAILURE,
            payload: response.data
        });
    }
};

export const resetPassword = (data, setErrors, setSubmitting) => async dispatch => {
    setSubmitting(true);
    dispatch({
        type: RESET_PASSWORD_REQUEST
    });
    const response = await api.post('/auth/reset-password', data);
    setSubmitting(false);
    if (response.data.status === "success") {
        dispatch({
            type: RESET_PASSWORD_SUCCESS
        });
        history.push("/authentication/sign-in")
    } else {
        setErrors(response.data.errorMessage);
        dispatch({
            type: RESET_PASSWORD_FAILURE,
            payload: response.data
        });
    }
};