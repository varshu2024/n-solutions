import jwt from 'jsonwebtoken';
import { verifyToken } from '../utils/jwt.js';

export const requireAdmin = (request, response, next) => {
  const authorization = request.get('Authorization');
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return response.status(401).json({ success: false, message: 'Authentication token is required.' });
  }

  const token = authorization.slice(7).trim();
  if (!token) {
    return response.status(401).json({ success: false, message: 'Authentication token is required.' });
  }

  try {
    const payload = verifyToken(token);
    if (payload.role !== 'admin' || !payload.sub || !payload.email) {
      return response.status(403).json({ success: false, message: 'Admin access is required.' });
    }
    request.admin = { id: payload.sub, email: payload.email, role: payload.role };
    return next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return response.status(401).json({ success: false, message: 'Authentication token has expired.' });
    }
    return response.status(401).json({ success: false, message: 'Invalid authentication token.' });
  }
};
