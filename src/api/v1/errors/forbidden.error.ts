import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './custom_api.error';

class UnauthorizedError extends CustomAPIError {
  constructor(message: string = 'Forbidden') {
    super({message : message, statusCode: StatusCodes.FORBIDDEN});
  }
}

export default UnauthorizedError;
