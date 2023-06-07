import { StatusCodes } from 'http-status-codes';
import CustomError from './custom.error';

class UnauthenticatedError extends CustomError {
  constructor(message: string = 'Unauthenticated') {
    super({ message: message, statusCode: StatusCodes.UNAUTHORIZED });
  }
}

export default UnauthenticatedError;
