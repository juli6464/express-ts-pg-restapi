import { Router } from 'express'
import { verifyToken } from '../middlewares/auth'
const router = Router();

import { createUser, deleteUser, getUserById, getUsers, loginUser, logoutUser, updateUser } from '../controllers/user.controller'
import { createWallet, deleteWallet, getWalletById, getWallets, updateWallet } from '../controllers/wallet.controller';

//user routes
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

//login routes
router.post('/signin', loginUser)
router.post('/signout', verifyToken, logoutUser)

//wallet routes
router.get('/wallets', verifyToken, getWallets);
router.get('/wallets/:id', verifyToken, getWalletById);
router.post('/wallets', verifyToken, createWallet);
router.put('/wallets/:id', verifyToken, updateWallet);
router.delete('/wallets/:id', verifyToken, deleteWallet);

export default router;