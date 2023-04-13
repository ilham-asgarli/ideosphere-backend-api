import { StatusCodes } from 'http-status-codes';
import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import CustomAPIError from '../../errors/custom_api.error';

export const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong try again later',
  };

  if(err instanceof CustomAPIError) {
    customError.message = err.message;
    customError.statusCode = err.statusCode;
  } else if (err.name === 'ValidationError') {
    customError.message = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(',');
    customError.statusCode = 400;
  } else if (err.code && err.code === 11000) {
    customError.message = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  } else if (err.name === 'CastError') {
    customError.message = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json({ msg: customError.message });
};
