import { DELETE_BUSINESS, UPDATE_BUSINESS, FETCH_ALL_BUSINESS, FETCH_BUSINESS, FETCH_BUSINESS_JOBS } from '../../constants/actionTypes';

export default (state = [], action) => {
    switch(action.type) {
        case FETCH_ALL_BUSINESS:
            return action.payload;
        case FETCH_BUSINESS:
            return action.payload;
        case UPDATE_BUSINESS:
            return state.map((business) => (business._id === action.payload._id ? action.payload : business));
        case DELETE_BUSINESS:
            return state.filter((business) => business._id !== action.payload);
        case FETCH_BUSINESS_JOBS:
            return action.payload;
        default:
            return state;
    }
};
