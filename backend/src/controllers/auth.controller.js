import { env } from '../config/env.js';
import { registerAdmin, loginAdmin } from '../services/auth.service.js';
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

export const getRegistrationConfig = () => ({ mode: env.adminRegistrationMode });
