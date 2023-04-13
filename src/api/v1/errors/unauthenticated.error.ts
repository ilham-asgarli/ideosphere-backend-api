import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './custom_api.error';

class UnauthenticatedError extends CustomAPIError {
  constructor(message: string = 'Unauthenticated') {
    super({message : message, statusCode: StatusCodes.UNAUTHORIZED});
  }
}

export default UnauthenticatedError;
