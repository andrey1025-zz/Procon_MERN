import { combineReducers } from 'redux';

import loading from './loadingReducer';
import authReducer from './authReducer';
import errorMessage from './errorReducer';
import photoReducer from './photoReducer';
import projectReducer from './projectReducer';

export default combineReducers({
    loading,
    errorMessage,
    auth: authReducer,
    photo: photoReducer,
    project: projectReducer
})