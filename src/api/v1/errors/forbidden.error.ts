import { StatusCodes } from 'http-status-codes';
import CustomError from './custom.error';

class UnauthorizedError extends CustomError {
  constructor(message: string = 'Forbidden') {
    super({ message: message, statusCode: StatusCodes.FORBIDDEN });
  }
}

export default UnauthorizedError;
