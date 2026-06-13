import bcrypt from 'bcryptjs';
import { SALT_ROUNDS } from '../constants';

export async function hashPassword(plaintext: string): Promise<string> {
    return bcrypt.hash(plaintext, SALT_ROUNDS);
}

export async function comparePassword(plaintext: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plaintext, hashed);
}
