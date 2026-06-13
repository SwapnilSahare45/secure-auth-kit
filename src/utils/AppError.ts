export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly code?: string;

    constructor(message: string, statusCode: number, code?: string) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        this.code = code;

        // Restore prototype chain
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message: string, code?: string): AppError {
        return new AppError(message, 400, code);
    }

    static unauthorized(message = 'Unauthorized', code?: string): AppError {
        return new AppError(message, 401, code);
    }

    static forbidden(message = 'Forbidden', code?: string): AppError {
        return new AppError(message, 403, code);
    }

    static notFound(message = 'Not found', code?: string): AppError {
        return new AppError(message, 404, code);
    }

    static internal(message = 'Internal server error', code?: string): AppError {
        return new AppError(message, 500, code);
    }
}
