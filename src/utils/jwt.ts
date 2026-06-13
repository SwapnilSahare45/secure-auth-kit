import jwt from 'jsonwebtoken';
import { JWTConfig, TokenPayload } from '../types/jwt.types';
import { AppError } from './AppError';

export function generateAccessToken(
    payload: Omit<TokenPayload, 'type' | 'exp'>,
    config: JWTConfig
): string {
    return jwt.sign({ ...payload, type: 'access' }, config.secret, {
        expiresIn: config.accessTokenExpiry ?? '15m',
    } as jwt.SignOptions);
}

export function generateRefreshToken(
    payload: Omit<TokenPayload, 'type' | 'exp'>,
    config: JWTConfig
): string {
    return jwt.sign({ ...payload, type: 'refresh' }, config.secret, {
        expiresIn: config.refreshTokenExpiry ?? '7d',
    } as jwt.SignOptions);
}

export function verifyToken(token: string, config: JWTConfig): TokenPayload {
    try {
        return jwt.verify(token, config.secret) as TokenPayload;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw AppError.unauthorized('Token has expired', 'TOKEN_EXPIRED');
        }

        if (error instanceof jwt.JsonWebTokenError) {
            throw AppError.unauthorized('Invalid token', 'TOKEN_INVALID');
        }

        throw AppError.unauthorized('Token verification failed');
    }
}
