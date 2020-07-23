import axios from 'axios';
import { store } from '../store';
import config from '../config';
import {
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS
} from '../store/types';
import history from '../history';

const { dispatch } = store;
const backend = axios.create({
    baseURL: config.apiUrl,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

backend.interceptors.request.use(function (config) {
    const { token } = store.getState().auth;
    if (token)
        config.headers.Authorization = `Bearer ${token}`
    return config;
});

backend.interceptors.response.use(response => {
    return response;
}, err => {
    return new Promise((resolve, reject) => {
        const originalReq = err.config;
        if (err && err.response) {
            if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
                originalReq._retry = true;
                dispatch({ type: REFRESH_TOKEN_REQUEST });
                let res = axios.post(`${config.apiUrl}/auth/refresh-Token`, null, { withCredentials: true })
                    .then(res => {
                        dispatch({
                            type: REFRESH_TOKEN_SUCCESS,
                            payload: res.data
                        });
                        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
                        return backend(originalReq);
                    });
                resolve(res);
            }
            else if (err.response.status === 401 && err.config && err.config.__isRetryRequest) {
                history.push("/en/app/home");
            }
            else if (err.response.status === 404) {
                return resolve({
                    data: {
                        errorMessage: {
                            fatalError: "No found"
                        }
                    }
                });
            }
            else if (err.response.status === 500) {
                return resolve({
                    data: {
                        errorMessage: {
                            fatalError: "Internal server error"
                        }
                    }
                });
            }
            else if (err.response.status === 400) {
                return resolve({
                    data: err.response.data
                });
            }
        } else if (err.request) {
            return resolve({
                data: {
                    errorMessage: {
                        fatalError: "Internal server error"
                    }
                }
            });
        }
        return Promise.reject(err);
    });
});
export default backend;