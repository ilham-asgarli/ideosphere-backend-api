import { Router } from 'express';
import { securedOperation } from '../middlewares/auth/secured_operation.middlware';
import { ChatController, EventController } from '../controllers';

const router = Router();
const eventController = new EventController();

router.use(securedOperation());

router.ws('/all-close', eventController.getCloseEvents);

export default router;