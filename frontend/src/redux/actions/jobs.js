import { CREATE_JOB, FETCH_JOB, FETCH_ALL_JOB, UPDATE_JOB, DELETE_JOB, FETCH_SOME_JOBS } from '../../constants/actionTypes';

import * as api from '../api/index';

export const createJob = (job) => async(dispatch) => {
    try {
        const { data } = await api.createJob(job);

        dispatch({ type: CREATE_JOB, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const getJob = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchJob(id);

        dispatch( { type: FETCH_JOB, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const getJobs = () => async (dispatch) => {
    try {
        const { data } = await api.fetchJobs();

        dispatch({ type: FETCH_ALL_JOB, payload: data });
    } catch (error) {
        console.log(error.message);
    }
} 

export const updateJob = (id, job) => async (dispatch) => {
    try {
        const { data } = await api.updateJob(id, job);
        
        dispatch( { type: UPDATE_JOB, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteJob = (id) => async (dispatch) => {
    try {
        await api.deleteJob(id);

        dispatch({ type: DELETE_JOB, payload: id });
    } catch (error) {
        console.log(error.message);
    }
}

export const searchJobs = (query) => async (dispatch) => {
    try {
        const { data } = await api.searchJobs(query);

        dispatch({ type: FETCH_JOB, payload: data })
    } catch (error) {
        console.log(error.message);
    }
}

export const getSomeJobs = (jobs) => async (dispatch) => {
    try {
        const { data } = await api.getSomeJobs(jobs);

        dispatch({ type: FETCH_SOME_JOBS, payload: data })
    } catch (error) {
        console.log(error.message);
    }
} 