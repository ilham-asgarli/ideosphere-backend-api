import { Router } from 'express';
import { securedOperation } from '../middlewares/auth/secured_operation.middlware';
import { AuthController, ChatController } from '../controllers';

const router = Router();
const chatController = new ChatController();

router.use(securedOperation());

router.get('/users', chatController.getUsers);
router.get('/messages', chatController.getMessages);
router.post('/message', chatController.writeMessage);

export default router;