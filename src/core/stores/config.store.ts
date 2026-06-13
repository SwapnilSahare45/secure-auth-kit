import { SecureAuthConfig } from '../../types/config.types.js';
import { AppError } from '../../utils/AppError.js';

let _config: SecureAuthConfig | null = null;

export function setConfig(config: SecureAuthConfig): void {
    _config = config;
}

export function getConfig(): SecureAuthConfig {
    if (!_config) {
        throw AppError.internal(
            'secure-auth-kit: config has not been initialized. Call secureAuth() first.'
        );
    }

    return _config;
}
