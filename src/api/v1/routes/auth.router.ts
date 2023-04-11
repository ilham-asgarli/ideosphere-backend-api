import { Router } from 'express';
import { AuthController } from '../controllers/auth/auth.controller';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
//router.post('/verify-email', AuthController.verifyEmail);
router.post('/reset-password', AuthController.resetPassword);
//router.post('/forgot-password', AuthController.forgotPassword);

module.exports = router;

export default router;