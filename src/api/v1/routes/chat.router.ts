import { Router } from 'express';
import { securedOperation } from '../middlewares/auth/secured_operation.middlware';
import { ChatController } from '../controllers';

const router = Router();
const chatController = new ChatController();

router.use(securedOperation());

router.ws('/', chatController.getMessages);

export default router;