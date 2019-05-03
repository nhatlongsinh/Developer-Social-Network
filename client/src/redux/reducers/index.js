import { combineReducers } from 'redux';
import authReducer from './authReducer';
import appStatus from './appStatusReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';

export default combineReducers({
  auth: authReducer,
  appStatus,
  profile: profileReducer,
  post: postReducer
});
