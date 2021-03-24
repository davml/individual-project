import { AUTH_BUSINESS, LOGOUT_BUSINESS } from '../../constants/actionTypes';

const businessAuthReducer = (state = { authData: null }, action) => {
    switch(action.type) {
        case AUTH_BUSINESS:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return {...state, authData: action.data };
        case LOGOUT_BUSINESS:
            localStorage.clear();
            return {...state, authData: null};
        default:
            return state;
    }
}

export default businessAuthReducer;