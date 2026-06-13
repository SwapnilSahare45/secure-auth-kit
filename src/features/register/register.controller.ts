import { NextFunction, Request, Response } from 'express';
import { getConfig } from '../../core/stores/config.store.js';
import { sendSuccess } from '../../utils/response.js';
import { registerUser } from './register.service.js';
import { validateRegisterInput } from './register.validator.js';

export const registerController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const input = validateRegisterInput(req.body);
        const config = getConfig();
        const result = await registerUser(input, config);

        sendSuccess(res, result, 'Registration successful', 201);
    } catch (err) {
        next(err);
    }
};
