import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController();

router.post('/register', authController.register);
router.post('/login', authController.login);
//router.post('/verify-email', authController.verifyEmail);
router.post('/reset-password', authController.resetPassword);
//router.post('/forgot-password', authController.forgotPassword);

export default router;