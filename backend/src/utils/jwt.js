import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const signAdminToken = (admin) => jwt.sign(
  {
    sub: admin.id,
    email: admin.email,
    role: admin.role
  },
  env.jwtSecret,
  { expiresIn: env.jwtExpiresIn }
);

export const verifyToken = (token) => jwt.verify(token, env.jwtSecret);
