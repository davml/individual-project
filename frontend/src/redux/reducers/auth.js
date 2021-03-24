import { AUTH_USER, LOGOUT_USER } from '../../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
    switch(action.type) {
        case AUTH_USER:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return {...state, authData: action.data };
        case LOGOUT_USER:
            localStorage.clear();
            return {...state, authData: null};
        default:
            return state;
    }
}

export default authReducer;