import { NextFunction, Request, Response } from 'express';
import { UnauthenticatedError } from '../../errors';
import { verifyJwtToken } from '../../helpers/jwt.helper';

export const securedOperation = (requiredRoles?: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    if (!authorization) return next(new UnauthenticatedError());

    const auth = authorization.split(' ');
    const token = auth[auth.length > 0 ? auth.length - 1 : 0];

    const userRoles = verifyJwtToken(token)?.roles;

    if (!requiredRoles) return next(); // new UnauthenticatedError()
    if (!userRoles) return next(); // new UnauthenticatedError()

    for (const userRole of userRoles) {
      if (requiredRoles.includes(userRole)) return next();
    }

    return next(new UnauthenticatedError());
  };
};
