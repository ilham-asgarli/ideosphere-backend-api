import { NextFunction, Request, Response } from 'express';
import UnauthenticatedError from '../../errors/unauthenticated.error';

const apiKeyChecker = (req: Request, res: Response, next: NextFunction) => {
  if (!req?.get('x-api-key')) return next(new UnauthenticatedError());
  const apiKey = req.get('x-api-key');
  if (apiKey !== process.env.API_KEY) return next(new UnauthenticatedError());
  next();
};

module.exports = apiKeyChecker;
