import { Request, Response, NextFunction } from 'express';

export const handleErrorAsync = (func: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next).catch((error) => next(error));
    };