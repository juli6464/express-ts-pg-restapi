import { Router } from 'express'
import { verifyToken } from '../middlewares/auth'
const router = Router();

import { createUser, deleteUser, getUserById, getUsers, loginUser, logoutUser, updateUser } from '../controllers/index.controller'

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.post('/signin', loginUser)
router.post('/signout', verifyToken, logoutUser)

export default router;