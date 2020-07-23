import { combineReducers } from 'redux';

import loading from './loadingReducer';
import authReducer from './authReducer';
import errorMessage from './errorReducer';
import photoReducer from './photoReducer';

export default combineReducers({
    loading,
    errorMessage,
    auth: authReducer,
    photo: photoReducer
})