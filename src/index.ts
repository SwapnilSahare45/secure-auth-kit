import { Express } from 'express';
import { errorMiddleware } from './core/middleware/error.middleware';
import { createAuthRouter } from './core/routes/auth.routes';
import { setConfig } from './core/stores/config.store';
import { SecureAuthConfig } from './types/config.types';

export async function secureAuth(app: Express, config: SecureAuthConfig): Promise<void> {
    setConfig(config);

    const prefix = config.routePrefix ?? '/auth';
    // Core auth router
    app.use(prefix, createAuthRouter());

    // Error Handler
    app.use(errorMiddleware);
}
