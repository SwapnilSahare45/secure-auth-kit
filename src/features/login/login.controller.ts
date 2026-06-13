import { NextFunction, Request, Response } from 'express';
import { getConfig } from '../../core/stores/config.store.js';
import { sendSuccess } from '../../utils/response.js';
import { validateRegisterInput } from '../register/register.validator.js';
import { loginUser } from './login.service.js';

export const loginController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const input = validateRegisterInput(req.body);
        const config = getConfig();
        const result = await loginUser(input, config);

        sendSuccess(res, result, 'Login successful');
    } catch (err) {
        next(err);
    }
};
