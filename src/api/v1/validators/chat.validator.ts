import Joi from 'joi';
import { validate } from '../helpers/validation.helper';

export class ChatValidator {
  getMessages(body: any) {
    const schema = Joi.object({
      user_id: Joi.string().uuid().required(),
    });

    validate(body, schema);
  }

  onOpenMessages(body: any) {
    const schema = Joi.object({
      user_id: Joi.string().uuid().required(),
      chat_id: Joi.string().uuid().required(),
      messages: Joi.array().items(Joi.string()).required(),
    });

    validate(body, schema);
  }

  onNewMessage(body: any) {
    const schema = Joi.object({
      user_id: Joi.string().uuid().required(),
      chat_id: Joi.string().uuid().required(),
      message: Joi.string().required(),
    });

    validate(body, schema);
  }
}
