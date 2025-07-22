import { Router } from 'express';
import * as UserController from '../user/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/profile', authMiddleware, UserController.profile);
router.get('/users', authMiddleware, UserController.getAllUsers);
router.put('/profile', authMiddleware, UserController.updateProfile);
router.delete('/profile', authMiddleware, UserController.deleteAccount);


export default router;

