import Joi from "joi";
import { validate } from "../helpers/validation.helper";

export class EventValidator {
    onCreateEvent(body: any) {
        const schema = Joi.object({
            organizer_id: Joi.string().uuid().required(),
            gender_id: Joi.number().min(1).max(3).required(),
            name: Joi.string(),
            description: Joi.string(),
            address: Joi.string(),
            max_age: Joi.number().integer(),
            min_age: Joi.number().integer(),
            entry_fee: Joi.number().positive(),
            participant_capacity: Joi.number().positive(),
            start_time: Joi.date().greater('now'),
            end_time: Joi.date().greater(Joi.ref('start_time')),
            tags: Joi.array().items(Joi.string()),
            location: Joi.object()
                .keys({
                    latitude: Joi.number().min(-90).max(90).required(),
                    longitude: Joi.number().min(-180).max(180).required(),
                }).required(),
        });

        validate(body, schema);
    }

    joinEvent(body: any) {
        const schema = Joi.object({
            user_id: Joi.string().uuid().required(),
            event_id: Joi.string().uuid().required(),
        });

        validate(body, schema);
    }
}