import { Router } from 'express'
const router = Router();

import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/index.controller'

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;