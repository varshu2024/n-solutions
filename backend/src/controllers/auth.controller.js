import { env } from '../config/env.js';
import {
  registerAdmin,
  loginAdmin,
  sendLoginOtp,
  verifyLoginOtp
} from '../services/auth.service.js';
import { revokeToken } from '../utils/jwt.js';
import { sendSuccess } from '../utils/response.js';
import { validateLoginInput, validateRegistrationInput } from '../utils/validation.js';

const validationError = (details) => {
  const error = new Error('Request validation failed.');
  error.statusCode = 400;
  error.details = details;
  return error;
};

export const register = async (request, response) => {
  const { name, email, password } = request.body || {};
  const details = validateRegistrationInput({ name, email, password });
  if (Object.keys(details).length > 0) throw validationError(details);

  const admin = await registerAdmin({
    name,
    email,
    password,
    registrationKey: request.get('X-Admin-Registration-Key')
  });
  return sendSuccess(response, 201, 'Admin registered successfully.', { admin });
};

export const login = async (request, response) => {
  const { email, password } = request.body || {};
  const details = validateLoginInput({ email, password });
  if (Object.keys(details).length > 0) throw validationError(details);

  const data = await loginAdmin({ email, password });
  return sendSuccess(response, 200, 'Login successful.', data);
};

export const logout = async (request, response) => {
  if (request.token) {
    revokeToken(request.token);
  }

  return sendSuccess(response, 200, 'Logout successful.');
};

export const getRegistrationConfig = () => ({ mode: env.adminRegistrationMode });

export const sendOtp = async (request, response) => {
  const { email, password } = request.body || {};

  const details = validateLoginInput({ email, password });

  if (Object.keys(details).length > 0) {
    throw validationError(details);
  }

  const data = await sendLoginOtp({ email, password });

  return sendSuccess(response, 200, data.message, data);
};

export const verifyOtp = async (request, response) => {
  const { email, otp } = request.body || {};

  if (!email || typeof email !== 'string') {
    throw validationError({
      email: 'A valid email is required.'
    });
  }

  if (!otp || !/^\d{6}$/.test(String(otp))) {
    throw validationError({
      otp: 'OTP must be a 6-digit code.'
    });
  }

  const data = await verifyLoginOtp({
    email,
    otp: String(otp)
  });

  return sendSuccess(response, 200, 'OTP verified successfully.', data);
};