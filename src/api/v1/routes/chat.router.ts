import { Router } from 'express';
import { securedOperation } from '../middlewares/auth/secured_operation.middlware';
import { ChatController } from '../controllers';

const router = Router();
const chatController = new ChatController();

router.use(securedOperation());

router.ws('/all', chatController.getAll);
router.ws('/messages/:chat_id', chatController.getMessages);
router.post('/message', chatController.writeMessage);

export default router;