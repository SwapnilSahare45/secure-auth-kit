import { RegisterInput, RegisterResult } from '../../types/auth.types';
import { SecureAuthConfig } from '../../types/config.types';
import { AppError } from '../../utils/AppError';
import { hashPassword } from '../../utils/hash';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt';
import { sanitizeUser } from '../../utils/sanitizeUser';

export const registerUser = async (
    input: RegisterInput,
    config: SecureAuthConfig
): Promise<RegisterResult> => {
    const { userModel, jwt: jwtConfig } = config;

    const existingUser = await userModel.findOne({ email: input.email });
    if (existingUser) {
        throw AppError.badRequest('Email is already registered', 'EMAIL_TAKEN');
    }

    const hash_password = await hashPassword(input.password);

    const user = await userModel.create({
        ...input,
        password: hash_password,
    });

    const tokenPayload = { userId: String(user._id), email: user.email };
    const accessToken = generateAccessToken(tokenPayload, jwtConfig);
    const refreshToken = generateRefreshToken(tokenPayload, jwtConfig);

    return {
        user: sanitizeUser(user),
        tokens: { accessToken, refreshToken },
    };
};
