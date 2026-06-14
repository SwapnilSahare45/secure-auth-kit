import { Express } from 'express';
import { errorMiddleware } from './core/middleware/error.middleware.js';
import { createAuthRouter } from './core/routes/auth.routes.js';
import { setConfig } from './core/stores/config.store.js';
import { SecureAuthConfig } from './types/config.types.js';

export function secureAuth(app: Express, config: SecureAuthConfig): void {
    validateConfig(config);

    setConfig(config);

    const prefix = config.routePrefix ?? '/auth';
    // Core auth router
    app.use(prefix, createAuthRouter());

    // Error Handler
    app.use(errorMiddleware);
}

const validateConfig = (config: SecureAuthConfig): void => {
    if (!config.userModel) {
        throw new Error(
            '[secure-auth-kit] config.userModel is required. ' +
                'Pass your Mongoose User model: secureAuth(app, {userModel: User, ... })'
        );
    }

    if (!config.jwt?.secret) {
        throw new Error(
            '[secure-auth-kit] config.jwt.secret is required. ' +
                'Set JWT_SECRET in your environment and pass it via: jwt: { secret: process.env.JWT_SECRET }'
        );
    }

    const emailPath = config.userModel.schema.path('email');
    if (!emailPath) {
        throw new Error(
            '[secure-auth-kit] Your User model is missing the required "email" field.' +
                'Add `email: { type: String, required: true, unique: true }` to your schema.'
        );
    }

    const passwordPath = config.userModel.schema.path('password');
    if (!passwordPath) {
        throw new Error(
            '[secure-auth-kit] Your User model is missing the required "password" field.' +
                'Add `password: { type: String, required: true}` to your schema.'
        );
    }
};
