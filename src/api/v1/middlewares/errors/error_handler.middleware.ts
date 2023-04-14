import { StatusCodes } from 'http-status-codes';
import { ErrorRequestHandler } from 'express';
import CustomAPIError from '../../errors/custom_api.error';

export const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);

  if(err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  
  if (err.name === 'SequelizeValidationError') {
    const message = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(', ');
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: message });
  }

  return res.status(500).json({ message: 'Something went wrong try again later' });
};
