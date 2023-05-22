import { Router } from 'express';
import { securedOperation } from '../middlewares/auth/secured_operation.middlware';
import { AuthController } from '../controllers';

const router = Router();
const authController = new AuthController();

router.post('/register', authController.register);
router.post('/login', authController.login);

router.use(securedOperation());

//router.post('/verify-email', authController.verifyEmail);
router.post('/reset-password', authController.resetPassword);
//router.post('/forgot-password', authController.forgotPassword);

export default router;