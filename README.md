# Secure Auth Kit

Authentication toolkit for Express.js and MongoDB.

---

## Installation

```bash
npm install secure-auth-kit
```

---

## Quick Start

```ts
import express from 'express';
import mongoose from 'mongoose';
import { secureAuth } from 'secure-auth-kit';
import { User } from './models/User.js';

const app = express();

secureAuth(app, {
    userModel: User,
    jwt: {
        secret: 'your_jwt_secret',
        accessTokenExpiry: '15m', // default
        refreshTokenExpiry: '7d', // default
    },
});

app.listen(3000);
```

This registers the following routes under `/auth` (configurable via `routePrefix`):

| Method | Route          | Auth required |
| ------ | -------------- | ------------- |
| POST   | /auth/register | No            |
| POST   | /auth/login    | No            |
| GET    | /auth/me       | Yes           |

---

## User Model Requirements

Your Mongoose schema **must** have `email` and `password` fields. The package validates this at startup and throws a descriptive error if either is missing.

```ts
// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export const User = mongoose.model('User', userSchema);
```

`secure-auth-kit` will hash passwords on register and compare them on login - **never** store plaintext passwords yourself.

---

## Configuration

```ts
secureAuth(app, {
    userModel: User,

    jwt: {
        secret: 'your_jwt_secret',
        accessTokenExpiry: '15m', // optional, default: '15m'
        refreshTokenExpiry: '7d', // optional, default: '7d'
    },

    routePrefix: '/auth', // optional, default: '/auth'
});
```

---

## `authenticate` Middleware

Protect any route by importing `authenticate`:,

```ts
import { authenticate } from 'secure-auth-kit';

app.get('/protected', authenticate, (req, res) => {
    res.json({ user: req.user });
});
```

---

## API Reference

### Routes

**POST /auth/register**

```json
{
    "email": "user@example.com",
    "password": "Secret@123"
}
```

Returns `{ user, tokens: { accessToken, refreshToken }}`

**POST /auth/login**

```json
{
    "email": "user@example.com",
    "password": "Secret@123"
}
```

Returns `{ user, tokens: { accessToken, refreshToken }}`

**GET /auth/me** _(requires Bearer token)_
</br>
Returns the current user (sanitized, no password).

---

## Security Notes

- Passwords are hashed with **bcrypt** (10 salt rounds).
- Access tokens default to **15 min** expiry; refresh tokens to **7 days**.

---
