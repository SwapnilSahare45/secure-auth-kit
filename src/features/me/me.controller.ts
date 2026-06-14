import { NextFunction, Request, Response } from 'express';
import { getConfig } from '../../core/stores/config.store.js';
import { AppError } from '../../utils/AppError.js';
import { sendSuccess } from '../../utils/response.js';
import { sanitizeUser } from '../../utils/sanitizeUser.js';

export const meController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.user) {
            throw AppError.unauthorized('Authentication required');
        }

        const { userModel } = getConfig();

        const user = await userModel.findById(req.user.id);
        if (!user) {
            throw AppError.notFound('User not found', 'USER_NOT_FOUND');
        }

        sendSuccess(res, sanitizeUser(user));
    } catch (err) {
        next(err);
    }
};
