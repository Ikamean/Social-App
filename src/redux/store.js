import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import accountReducer from './reducers/accountReducer';
import usersReducer from './reducers/usersReducer';
import postReducer from './reducers/postReducer';


const reducer = combineReducers({
    account: accountReducer,
    users: usersReducer,
    content: postReducer
});

const store = createStore(reducer,applyMiddleware(thunk))

export default store