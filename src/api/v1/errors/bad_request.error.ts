import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './custom_api.error';

class BadRequestError extends CustomAPIError {
  constructor(message: string = 'Bad Request') {
    super({message : message, statusCode: StatusCodes.BAD_REQUEST});
  }
}

export default BadRequestError;
