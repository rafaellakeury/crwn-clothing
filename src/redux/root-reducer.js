import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import { UserActionTypes } from './user/user.types';

export default combineReducers({
    user: userReducer
});