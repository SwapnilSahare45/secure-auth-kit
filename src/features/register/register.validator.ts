import {
    EMAIL_REGEX,
    MIN_PASSWORD_LENGTH,
    PASSWORD_LOWERCASE_REGEX,
    PASSWORD_NUMBER_REGEX,
    PASSWORD_SPECIAL_CHARACTER_REGEX,
    PASSWORD_UPPERCASE_REGEX,
} from '../../constants/index.js';
import { RegisterInput } from '../../types/auth.types.js';
import { AppError } from '../../utils/AppError.js';

export const validateRegisterInput = (body: unknown): RegisterInput => {
    if (typeof body !== 'object' || body === null) {
        throw AppError.badRequest('Request body is required', 'INVALID_BODY');
    }

    const { email, password, ...rest } = body as Record<string, unknown>;

    if (typeof email !== 'string' || !email.trim()) {
        throw AppError.badRequest('Email is required', 'EMAIL_REQUIRED');
    }

    if (!EMAIL_REGEX.test(email)) {
        throw AppError.badRequest('Invalid email format', 'EMAIL_INVALID');
    }

    if (typeof password !== 'string' || !password) {
        throw AppError.badRequest('Password is required', 'PASSWORD_REQUIRED');
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
        throw AppError.badRequest(
            `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
            'PASSWORD_TOO_SHORT'
        );
    }

    if (!PASSWORD_UPPERCASE_REGEX.test(password)) {
        throw AppError.badRequest(
            'Password must be at least one uppercase letter',
            'PASSWORD_MISSING_UPPERCASE_LETTER'
        );
    }

    if (!PASSWORD_LOWERCASE_REGEX.test(password)) {
        throw AppError.badRequest(
            'Password must be at least one lowercase letter',
            'PASSWORD_MISSING_LOWERCASE_LETTER'
        );
    }

    if (!PASSWORD_NUMBER_REGEX.test(password)) {
        throw AppError.badRequest(
            'Password must contain at least one number',
            'PASSWORD_MISSING_NUMBER'
        );
    }

    if (!PASSWORD_SPECIAL_CHARACTER_REGEX.test(password)) {
        throw AppError.badRequest(
            'Password must be at least one special character',
            'PASSWORD_MISSING_SPECIAL_CHARACTER'
        );
    }

    return { email: email.toLowerCase().trim(), password, ...rest };
};
