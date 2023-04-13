import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './custom_api.error';

class NotFoundError extends CustomAPIError {
  constructor(message: string = 'Not Found') {
    super({message : message, statusCode: StatusCodes.NOT_FOUND});
  }
}

export default NotFoundError;
