import { SENSITIVE_FIELDS } from '../constants';
import { SanitizedUser } from '../types/auth.types';
import { UserDocument } from '../types/config.types';

export function sanitizeUser(user: UserDocument): SanitizedUser {
    const raw = user.toObject ? user.toObject() : { ...user };

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
