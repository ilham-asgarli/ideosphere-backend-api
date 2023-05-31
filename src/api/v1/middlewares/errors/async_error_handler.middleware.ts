import { Request, Response, NextFunction } from 'express';
import { WebSocket } from 'ws';

export const handleErrorAsync = (func: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next).catch((error) => next(error));
    };

export const handleErrorAsyncWS = (func: (ws: WebSocket, req: Request, next: NextFunction) => Promise<any>) =>
    (ws: WebSocket, req: Request, next: NextFunction) => {
        func(ws, req, next).catch((error) => next(error));
    };