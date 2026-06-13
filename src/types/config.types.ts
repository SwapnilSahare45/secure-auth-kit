import { Document, Model } from 'mongoose';
import { JWTConfig } from './jwt.types';

export interface UserDocument extends Document {
    email: string;
    password: string;
    [key: string]: unknown;
}

export interface SecureAuthConfig {
    userModel: Model<UserDocument>;
    jwt: JWTConfig;
    routePrefix?: string;
}
