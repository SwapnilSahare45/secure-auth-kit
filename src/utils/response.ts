import { Response } from 'express';

export interface SuccessResponse<T = unknown> {
    success: true;
    data: T;
    message?: string;
}

export interface ErrorResponse {
    success: false;
    error: {
        message: string;
        code?: string;
        statusCode: number;
    };
}

export function sendSuccess<T>(res: Response, data: T, message?: string, statusCode = 200): void {
    const body: SuccessResponse<T> = {
        success: true,
        data,
        ...(message ? { message } : {}),
    };
    res.status(statusCode).json(body);
}

export function sendError(res: Response, message: string, statusCode = 500, code?: string): void {
    const body: ErrorResponse = {
        success: false,
        error: {
            message,
            statusCode,
            ...(code ? { code } : {}),
        },
    };
    res.status(statusCode).json(body);
}
