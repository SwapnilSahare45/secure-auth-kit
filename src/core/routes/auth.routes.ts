import { Router } from 'express';
import { loginController } from '../../features/login/login.controller';
import { registerController } from '../../features/register/register.controller';

export const createAuthRouter = (): Router => {
    const router = Router();

    router.post('/register', registerController);
    router.post('/login', loginController);

    return router;
};
