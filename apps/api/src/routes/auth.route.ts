import { Router, type Request, type Response } from 'express';
import * as authController from '../controllers/auth.controller.js';
const router: Router = Router();

router.post('/register', authController.register);

router.post('/verify-otp', authController.verifyOtp);

router.post('/login', authController.login);

router.post('/refresh', authController.refresh);

router.post('/logout', authController.logout);

router.get('/me', authController.aboutMe);

export default router;
