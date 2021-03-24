import { AUTH_BUSINESS, DELETE_BUSINESS, FETCH_BUSINESS, FETCH_ALL_BUSINESS, UPDATE_BUSINESS, FETCH_BUSINESS_JOBS } from '../../constants/actionTypes';
import * as api from '../api/index';

export const businessSignIn = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.businessSignIn(formData);

        dispatch( { type: AUTH_BUSINESS, data })

        history.push('/');
    } catch (error) {
        console.log(error);
    }
}

export const businessSignUp = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.businessSignUp(formData);

        dispatch( { type: AUTH_BUSINESS, data })

        history.push('/');
    } catch (error) {
        console.log(error);
    }
}

export const getBusinessAccount = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchBusinessAccount(id);

        dispatch( { type: FETCH_BUSINESS, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const getBusinessAccounts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchBusinessAccounts();

        dispatch({ type: FETCH_ALL_BUSINESS, payload: data });
    } catch (error) {
        console.log(error.message);
    }
} 

export const updateBusinessAccount = (id, user) => async (dispatch) => {
    try {
        const { data } = await api.updateBusinessAccount(id, user);
        
        dispatch( { type: UPDATE_BUSINESS, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteBusinessAccount = (id) => async (dispatch) => {
    try {
        await api.deleteBusinessAccount(id);

        dispatch({ type: DELETE_BUSINESS, payload: id });
    } catch (error) {
        console.log(error.message);
    }
}

export const getBusinessUserJobs = (id) => async (dispatch) => {
    try {
        const { data } = await api.getBusinessUserJobs(id);

        dispatch({ type: FETCH_BUSINESS_JOBS, payload: data })
    } catch (error) {
        console.log(error.message);
    }
}