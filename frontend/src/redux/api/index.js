import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

/*API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})*/


export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const fetchAccounts = () => API.get('/user/');
export const fetchAccount = (id) => API.get(`/user/${id}`);
export const updateAccount = (id, updatedAccount) => API.patch(`/user/${id}`, updatedAccount);
export const deleteAccount = (id) => API.delete(`/user/${id}`);
export const userJobApply = (userId, jobId) => API.post('/user/apply', {userId, jobId});
export const userJobDelete = (userId, jobId) => API.post('/user/delete', {userId, jobId});
export const getJobApplicants = (users) => API.post('/user/getUsers', {users: users});
export const updateJobState = (userId, jobId, newState) => API.post('/user/jobupdate', {userId: userId, jobId: jobId, newState: newState});


export const businessSignIn = (formData) => API.post('/businessuser/signin', formData);
export const businessSignUp = (formData) => API.post('/businessuser/signup', formData);
export const fetchBusinessAccounts = () => API.get('/businessuser/');
export const fetchBusinessAccount = (id) => API.get(`/businessuser/${id}`);
export const updateBusinessAccount = (id, updatedAccount) => API.patch(`/businessuser/${id}`, updatedAccount);
export const deleteBusinessAccount = (id) => API.delete(`/businessuser/${id}`);
export const getBusinessUserJobs = (id) => API.get(`/businessuser/getjobs/${id}`);


export const searchJobs = (query) => API.post('/job/search', query);
export const createJob = (formData) => API.post('/job', formData);
export const fetchJob = (id) => API.get(`/job/${id}`);
export const fetchJobs = () => API.get('/job/');
export const updateJob = (id, updatedJob) => API.patch(`/job/${id}`, updatedJob);
export const deleteJob = (id) => API.delete(`/job/${id}`);
export const getSomeJobs = (jobs) => API.post('/job/getjobs', jobs);

