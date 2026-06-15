import { Router } from 'express';
import { loginController } from '../../features/login/login.controller.js';
import { meController } from '../../features/me/me.controller.js';
import { refreshTokenController } from '../../features/refresh-token/refreshToken.controller.js';
import { registerController } from '../../features/register/register.controller.js';
import { authenticate } from '../../middleware/authenticate.middleware.js';

export const createAuthRouter = (): Router => {
    const router = Router();

    // Public routes
    router.post('/register', registerController);
    router.post('/login', loginController);
    router.post('/refresh-token', refreshTokenController);

    // Protected routes
    router.get('/me', authenticate, meController);

    return router;
};
