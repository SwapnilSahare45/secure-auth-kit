import { LoginInput } from '../../types/auth.types.js';
import { AppError } from '../../utils/AppError.js';

export const validateLoginInput = (body: unknown): LoginInput => {
    if (typeof body !== 'object' || body === null) {
        throw AppError.badRequest('Request body is required', 'INVALID_BODY');
    }

    const { email, password } = body as Record<string, unknown>;

    if (typeof email !== 'string' || !email.trim()) {
        throw AppError.badRequest('Email is required', 'EMAIL_REQUIRED');
    }

    if (typeof password !== 'string' || !password) {
        throw AppError.badRequest('Password is required', 'PASSWORD_REQUIRED');
    }

    return { email: email.toLowerCase().trim(), password };
};
