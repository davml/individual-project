import express from 'express';
import { signin, signup, getUser, getUsers, updateUser, deleteUser, getJobs } from '../controllers/businessUser.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);

router.get('/:id', getUser);
router.get('/', getUsers);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

router.get('/getjobs/:id', getJobs);
export default router;