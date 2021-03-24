import { DELETE_JOB, UPDATE_JOB, FETCH_ALL_JOB, FETCH_JOB, CREATE_JOB, SEARCH_JOB, FETCH_SOME_JOBS } from '../../constants/actionTypes';

export default (job = [], action) => {
    switch(action.type) {
        case FETCH_ALL_JOB:
            return action.payload;
        case FETCH_JOB:
            return action.payload;
        case UPDATE_JOB:
            return job.map((job) => (job._id === action.payload._id ? action.payload : job));
        case DELETE_JOB:
            return job.filter((job) => job._id !== action.payload);
        case CREATE_JOB:
            return [...job, action.payload];
        case SEARCH_JOB:
            return action.payload;
        case FETCH_SOME_JOBS:
            return action.payload;
        default:
            return job;
    }
};
