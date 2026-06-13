import { NextFunction, Request, Response } from 'express';
import { getConfig } from '../../core/stores/config.store';
import { sendSuccess } from '../../utils/response';
import { registerUser } from './register.service';
import { validateRegisterInput } from './register.validator';

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
