import { Router } from 'express';
import auth from './auth.router';
import socket from './socket.router';

const router = Router();

router.use('/auth', auth);
router.use('/socket', socket);

export default router;
