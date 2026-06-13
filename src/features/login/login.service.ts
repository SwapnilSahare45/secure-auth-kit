import { LoginInput, LoginResult } from '../../types/auth.types';
import { SecureAuthConfig } from '../../types/config.types';
import { AppError } from '../../utils/AppError';
import { comparePassword } from '../../utils/hash';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt';
import { sanitizeUser } from '../../utils/sanitizeUser';

export const loginUser = async (
    input: LoginInput,
    config: SecureAuthConfig
): Promise<LoginResult> => {
    const { userModel, jwt: jwtConfig } = config;

    const user = await userModel.findOne({ email: input.email }).select('+password');
    if (!user) {
        throw AppError.unauthorized('Invalid email or password', 'INVALID_CREDENTIALS');
    }

    const isMatch = await comparePassword(input.password, user.password);
    if (!isMatch) {
        throw AppError.unauthorized('Invalid email or password', 'INVALID_CREDENTIALS');
    }

    const tokenPayload = { userId: String(user._id), email: user.email };
    const accessToken = generateAccessToken(tokenPayload, jwtConfig);
    const refreshToken = generateRefreshToken(tokenPayload, jwtConfig);

    return { user: sanitizeUser(user), tokens: { accessToken, refreshToken } };
};
