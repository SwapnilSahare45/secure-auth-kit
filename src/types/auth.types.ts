export interface AuthenticatedUser {
    id: string;
    email: string;
    [key: string]: unknown;
}

export interface RegisterInput {
    email: string;
    password: string;
    [key: string]: unknown;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface SanitizedUser {
    id: string;
    email: string;
    [key: string]: unknown;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface RegisterResult {
    user: SanitizedUser;
    tokens: AuthTokens;
}

export interface LoginResult {
    user: SanitizedUser;
    tokens: AuthTokens;
}

export interface RefreshTokenInput {
    refreshToken: string;
}
