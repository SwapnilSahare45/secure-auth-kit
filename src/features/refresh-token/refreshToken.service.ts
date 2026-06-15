import { AuthTokens } from '../../types/auth.types.js';
import { SecureAuthConfig } from '../../types/config.types.js';
import { AppError } from '../../utils/AppError.js';
import { generateAccessToken, generateRefreshToken, verifyToken } from '../../utils/jwt.js';

export const refreshTokens = async (
    token: string,
    config: SecureAuthConfig
): Promise<AuthTokens> => {
    const { userModel, jwt: jwtConfig } = config;

    const payload = verifyToken(token, jwtConfig);

    if (payload.type !== 'refresh') {
        throw AppError.unauthorized('Invalid token type', 'TOKEN_TYPE_MISMATCH');
    }

    const user = await userModel.findById(payload.userId);
    if (!user) {
        throw AppError.unauthorized('User no longer exists', 'USER_NOT_FOUND');
    }

    const tokenPayload = { userId: String(user._id), email: user.email };
    const accessToken = generateAccessToken(tokenPayload, jwtConfig);
    const refreshToken = generateRefreshToken(tokenPayload, jwtConfig);

    return { accessToken, refreshToken };
};
