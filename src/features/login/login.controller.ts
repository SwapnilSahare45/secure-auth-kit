import { NextFunction, Request, Response } from 'express';
import { getConfig } from '../../core/stores/config.store';
import { sendSuccess } from '../../utils/response';
import { validateRegisterInput } from '../register/register.validator';
import { loginUser } from './login.service';

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
