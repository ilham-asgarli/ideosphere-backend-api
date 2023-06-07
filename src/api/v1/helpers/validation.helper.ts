import { ValidationError } from '../errors';
import Joi from 'joi';

export function validate(body: any, schema: Joi.ObjectSchema<any>) {
  const { error } = schema.validate(body);

  if (error) {
    throw new ValidationError(undefined, {
      [error.details[0].path.join('.')]: error.details[0].message.substring(error.details[0].message.indexOf(' ') + 1),
    });
  }
}
