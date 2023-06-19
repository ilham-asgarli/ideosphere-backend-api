import { Router } from 'express';
import { securedOperation } from '../middlewares/auth/secured_operation.middlware';
import { EventController } from '../controllers';

const router = Router();
const eventController = new EventController();

router.use(securedOperation());

router.post("/", eventController.createEvent);
router.post("/:event_id/participant", eventController.joinEvent);

export default router;