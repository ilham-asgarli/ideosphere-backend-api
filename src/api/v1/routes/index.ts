import { Router } from 'express';
import auth from './auth.router';
import socket from './socket.router';
import chat from './chat.router';
import event from './event.router';

const router = Router();

router.use('/auth', auth);
router.use('/socket', socket);
router.use('/chats', chat);
router.use('/events', event);

export default router;
