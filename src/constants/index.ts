export const SALT_ROUNDS = 10;

export const SENSITIVE_FIELDS = new Set(['password', '__v']);

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MIN_PASSWORD_LENGTH = 8;

export const PASSWORD_UPPERCASE_REGEX = /[A-Z]/;

export const PASSWORD_LOWERCASE_REGEX = /[a-z]/;

export const PASSWORD_NUMBER_REGEX = /\d/;

export const PASSWORD_SPECIAL_CHARACTER_REGEX = /[@$!%*?&]/;
