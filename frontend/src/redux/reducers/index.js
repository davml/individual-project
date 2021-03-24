import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import businessUser from './businessUser';
import businessAuth from './businessAuth';
import job from './jobs';


export default combineReducers({ auth, user, businessUser, job, businessAuth });