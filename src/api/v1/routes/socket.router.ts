import { Router } from 'express';
import { securedOperation } from '../middlewares/auth/secured_operation.middlware';
import { SocketController } from '../controllers';

const router = Router();
const chatController = new SocketController();

router.use(securedOperation());

router.ws('/', chatController.getMessages);

export default router;
