import { StatusCodes } from 'http-status-codes';
import { ErrorRequestHandler } from 'express';
import { instanceToPlain } from "class-transformer";
import { ErrorResponse, FailResponse } from '../../responses';
import { CustomError, UnauthenticatedError, ValidationError } from '../../errors';

export const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);

  if (err instanceof UnauthenticatedError) {
    return res.status(err.statusCode).json(instanceToPlain(new ErrorResponse({ message: err.message })));
  }

  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(instanceToPlain(new FailResponse({ data: err.data })));
  }

  if (err.name === 'SequelizeValidationError') {
    const message = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(', ');
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(instanceToPlain(new ErrorResponse({ message: message })));
  }

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(instanceToPlain(new ErrorResponse({ message: err.message })));
  }

  return res.status(500).json(instanceToPlain(new ErrorResponse({ message: 'Something went wrong try again later' })));
};
