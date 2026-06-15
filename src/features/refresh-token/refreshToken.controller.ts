import { NextFunction, Request, Response } from 'express';
import { getConfig } from '../../core/stores/config.store.js';
import { sendSuccess } from '../../utils/response.js';
import { refreshTokens } from './refreshToken.service.js';
import { validateRefreshTokenInput } from './refreshToken.validator.js';

export const refreshTokenController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { refreshToken } = validateRefreshTokenInput(req.body);
        const config = getConfig();
        const tokens = await refreshTokens(refreshToken, config);

        sendSuccess(res, { tokens }, 'Tokens refreshed');
    } catch (err) {
        next(err);
    }
};
