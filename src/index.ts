import { Express } from 'express';
import { errorMiddleware } from './core/middleware/error.middleware';
import { setConfig } from './core/stores/config.store';
import { SecureAuthConfig } from './types/config.types';

export async function secureAuth(app: Express, config: SecureAuthConfig): Promise<void> {
    setConfig(config);

    // Error Handler
    app.use(errorMiddleware);
}
