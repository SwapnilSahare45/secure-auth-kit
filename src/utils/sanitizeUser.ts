import { SENSITIVE_FIELDS } from '../constants/index.js';
import { SanitizedUser } from '../types/auth.types.js';
import { UserDocument } from '../types/config.types.js';

export function sanitizeUser(user: UserDocument): SanitizedUser {
    const raw = typeof user.toObject === 'function' ? user.toObject() : { ...user };

    const sanitized: Record<string, unknown> = {};

    for (const [key, val] of Object.entries(raw)) {
        if (!SENSITIVE_FIELDS.has(key)) {
            sanitized[key] = val;
        }
    }

    // Normalize _id -> id
    if (raw._id !== undefined) {
        sanitized['id'] = String(raw._id);
        delete sanitized['_id'];
    }

    return sanitized as SanitizedUser;
}
