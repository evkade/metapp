import { Request, Response, NextFunction } from 'express';
import { ErrorCode } from './errorCode';
import { ErrorException } from './errorException';
import { ErrorModel } from './errorModel';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ErrorException) {
        res.status(err.status).send(err);
    } else {
        // For unhandled errors.
        res.status(500).send({ code: ErrorCode.UnknownError, status: 500 } as ErrorModel);
    }
};