import { NextFunction, Request, Response } from "express";
import { UnauthenticatedError } from "../../errors";
import { verifyJwtToken } from "../../helpers/jwt.helper";

export const securedOperation = (requiredRoles: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if (!token) return next(new UnauthenticatedError());

        const userRoles = verifyJwtToken(token)?.roles
        if (!userRoles) return next(new UnauthenticatedError());

        for (const userRole of userRoles) {
            if (requiredRoles.includes(userRole)) return next();
        }

        return next(new UnauthenticatedError());
    }
}
