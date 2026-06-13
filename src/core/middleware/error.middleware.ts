import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../utils/AppError.js';
import { sendError } from '../../utils/response.js';

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction): void {
    if (err instanceof AppError && err.isOperational) {
        sendError(res, err.message, err.statusCode, err.code);
        return;
    }

    // Unknown Errors
    console.error('[secure-auth-kit] Unhandled error', err);
    sendError(res, 'An unexpected error occurred', 500, 'INTERNAL_ERROR');
}
