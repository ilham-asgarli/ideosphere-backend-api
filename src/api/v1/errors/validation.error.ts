import { StatusCodes } from 'http-status-codes';
import CustomError from './custom.error';

class ValidationError extends CustomError {
  data: any;

  constructor(message: string = 'Validation Error', data: any) {
    super({message : message, statusCode: StatusCodes.CONFLICT});
    this.data = data;
  }
}

export default ValidationError;
