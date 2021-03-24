import express from 'express';
import { signin, signup, getUsers, getUser, updateUser, deleteUser, userJobApply, userJobDelete, getJobApplicants, updateJobState } from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);

router.get('/:id', getUser);
router.get('/', getUsers);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/apply', userJobApply);
router.post('/delete', userJobDelete);
router.post('/getUsers', getJobApplicants);
router.post('/jobupdate', updateJobState);

export default router;