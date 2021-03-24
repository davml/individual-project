import express from 'express';
import { getJobs, getJob, createJob, deleteJob, updateJob, searchJobs, getSomeJobs, updateJobState } from '../controllers/job.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/search', searchJobs);
router.get('/:id', getJob);
router.get('/', getJobs);
router.post('/', createJob);
router.delete('/:id', deleteJob);
router.patch('/:id', updateJob);
router.post('/getjobs', getSomeJobs);
router.post('/updatestate', updateJobState)


export default router;