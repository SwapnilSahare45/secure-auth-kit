import { NextFunction, Request, Response } from 'express';
import { getConfig } from '../core/stores/config.store.js';
import { AppError } from '../utils/AppError.js';
import { verifyToken } from '../utils/jwt.js';

export const extractBearerToken = (authHeader: string | undefined): string | null => {
    if (!authHeader?.startsWith('Bearer ')) return null;
    const token = authHeader.slice(7).trim();
    return token || null;
};

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token = extractBearerToken(req.headers.authorization);

        if (!token) {
            throw AppError.unauthorized('Bearer token is required', 'TOKEN_MISSING');
        }

        const config = getConfig();
        const payload = verifyToken(token, config.jwt);

        if (payload.type === 'access') {
            throw AppError.unauthorized('Invalid token type', 'TOKEN_TYPE_MISMATCH');
        }

        req.user = { id: payload.userId, email: payload.email };

        next();
    } catch (err) {
        next(err);
    }
};
