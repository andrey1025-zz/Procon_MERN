import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import reducers from './reducers';

let store;
if (process.env.NODE_ENV === 'development') {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    store = createStore(
        reducers,
        composeEnhancers(applyMiddleware(reduxThunk))
    );
} else {
    store = createStore(
        reducers,
        applyMiddleware(reduxThunk)
    );
}

export { store };