import { Router } from 'express';
import { registerController } from '../../features/register/register.controller';

export const createAuthRouter = (): Router => {
    const router = Router();

    router.post('/register', registerController);

    return router;
};
