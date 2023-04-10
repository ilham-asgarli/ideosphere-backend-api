import { Router } from 'express'
//import { authenticateUser } from '../middleware/authentication';

import { UserController } from '../api/v1/controllers/auth.controller';

const router = Router()

router.post('/register', UserController.register);
router.post('/login', UserController.login);
//router.post('/verify-email', UserController.verifyEmail);
router.post('/reset-password', UserController.resetPassword);
//router.post('/forgot-password', UserController.forgotPassword);

module.exports = router;

export default router