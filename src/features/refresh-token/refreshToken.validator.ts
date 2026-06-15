import { RefreshTokenInput } from '../../types/auth.types.js';
import { AppError } from '../../utils/AppError.js';

export const validateRefreshTokenInput = (body: unknown): RefreshTokenInput => {
    if (typeof body !== 'object' || body === null) {
        throw AppError.badRequest('Request body is required', 'INVALID_BODY');
    }

    const { refreshToken } = body as Record<string, unknown>;

    if (typeof refreshToken !== 'string' || !refreshToken.trim()) {
        throw AppError.badRequest('Refresh token is required', 'REFRESH_TOKEN_REQUIRED');
    }

    return { refreshToken };
};
