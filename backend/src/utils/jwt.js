import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

const revokedTokens = new Set();

export const signAdminToken = (admin) => jwt.sign(
  {
    sub: admin.id,
    email: admin.email,
    role: admin.role
  },
  env.jwtSecret,
  { expiresIn: env.jwtExpiresIn }
);

export const revokeToken = (token) => {
  if (token) {
    revokedTokens.add(token);
  }
};

export const isTokenRevoked = (token) => revokedTokens.has(token);

export const verifyToken = (token) => {
  if (!token) {
    throw new Error('Token is required.');
  }

  if (isTokenRevoked(token)) {
    const error = new Error('Token has been revoked.');
    error.name = 'TokenRevokedError';
    throw error;
  }

  return jwt.verify(token, env.jwtSecret);
};
