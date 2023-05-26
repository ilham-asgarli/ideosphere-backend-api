import { Request, Response, NextFunction } from 'express';

export const handleErrorAsync = (func: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next).catch((error) => next(error));
    };

export const handleErrorAsyncWS = (func: (ws: any, req: Request, next: NextFunction) => Promise<any>) =>
    (ws: any, req: Request, next: NextFunction) => {
        func(ws, req, next).catch((error) => next(error));
    };