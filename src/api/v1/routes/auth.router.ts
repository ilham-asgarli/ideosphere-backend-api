import { Router } from 'express';
import { securedOperation } from '../middlewares/auth/secured_operation.middlware';
import { AuthController } from '../controllers';

const router = Router();
const authController = new AuthController();

router.post('/check-email', authController.checkEmail);
router.post('/sign-up', authController.signUp);
router.post('/sign-in', authController.signIn);

router.use(securedOperation());

//router.post('/verify-email', authController.verifyEmail);
router.post('/reset-password', authController.resetPassword);
//router.post('/forgot-password', authController.forgotPassword);

export default router;
