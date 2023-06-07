import { Router } from 'express';
import auth from './auth.router';
import chat from './chat.router';
import event from './event.router';

const router = Router();

router.use('/auth', auth);
router.use('/chat', chat);
router.use('/event', event);

export default router;
