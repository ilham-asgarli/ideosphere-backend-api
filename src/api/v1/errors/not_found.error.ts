import { StatusCodes } from 'http-status-codes';
import CustomError from './custom.error';

class NotFoundError extends CustomError {
  constructor(message: string = 'Not Found') {
    super({ message: message, statusCode: StatusCodes.NOT_FOUND });
  }
}

export default NotFoundError;
