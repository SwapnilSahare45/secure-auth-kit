import { Router } from 'express';
import { loginController } from '../../features/login/login.controller.js';
import { registerController } from '../../features/register/register.controller.js';

export const createAuthRouter = (): Router => {
    const router = Router();

    router.post('/register', registerController);
    router.post('/login', loginController);

    return router;
};
