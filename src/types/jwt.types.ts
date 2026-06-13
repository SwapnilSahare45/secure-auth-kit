export interface TokenPayload {
    userId: string;
    email: string;
    type: 'access' | 'refresh';
    exp?: number;
}

export interface JWTConfig {
    secret: string;
    accessTokenExpiry?: string;
    refreshTokenExpiry?: string;
}
