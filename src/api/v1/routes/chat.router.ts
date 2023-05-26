import { Router } from 'express';
import { securedOperation } from '../middlewares/auth/secured_operation.middlware';
import { ChatController } from '../controllers';

const router = Router();
const chatController = new ChatController();

router.use(securedOperation());

router.get('/all', chatController.getAll);
router.get('/messages', chatController.getMessages);
router.post('/message', chatController.writeMessage);

export default router;