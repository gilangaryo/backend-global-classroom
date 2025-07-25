import { Router } from 'express';
import * as AuthController from '../auth/auth.controller.js';

const router = Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/logout', AuthController.logout);

export default router;

