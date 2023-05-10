import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { securedOperation } from '../middlewares/auth/secured_operation.middlware';

const router = Router();
const authController = new AuthController();

router.post('/register', authController.register);
router.post('/login', authController.login);
//router.post('/verify-email', authController.verifyEmail);
router.post('/reset-password', securedOperation(""), authController.resetPassword);
//router.post('/forgot-password', authController.forgotPassword);

export default router;