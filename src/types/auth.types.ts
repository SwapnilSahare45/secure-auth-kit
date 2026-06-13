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
