import { StatusCodes } from 'http-status-codes';
import CustomError from './custom.error';

class InvalidTokenError extends CustomError {
  constructor(message: string = 'Invalid Token') {
    super({ message: message, statusCode: StatusCodes.UNAUTHORIZED });
  }
}

export default InvalidTokenError;
