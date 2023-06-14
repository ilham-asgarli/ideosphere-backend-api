import { Router } from 'express';
import { securedOperation } from '../middlewares/auth/secured_operation.middlware';
import { EventController } from '../controllers';

const router = Router();
const eventController = new EventController();

router.use(securedOperation());

//router.post('/', eventController.);

export default router;