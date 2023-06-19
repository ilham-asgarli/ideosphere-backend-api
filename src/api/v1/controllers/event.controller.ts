import { getInfoFromRequest } from "../helpers/jwt.helper";
import { handleErrorAsync } from "../middlewares/errors/async_error_handler.middleware";
import { EventService } from "../services";
import { EventValidator } from "../validators";

export class EventController {
    eventService = new EventService();
    eventValidator = new EventValidator();

    createEvent = handleErrorAsync(async (req, res) => {
        const decoded = await getInfoFromRequest(req);

        req.body.organizer_id = decoded.userId;
        this.eventValidator.createEvent(req.body);

        const data = await this.eventService.createEvent(req.body);
        res.status(204).end();
    });

    joinEvent = handleErrorAsync(async (req, res) => {
        const decoded = await getInfoFromRequest(req);

        req.body.user_id = decoded.userId;
        req.body.event_id = req.params.event_id;
        this.eventValidator.joinEvent(req.body);

        const data = await this.eventService.joinEvent(req.body);
        res.status(204).end();
    });
}