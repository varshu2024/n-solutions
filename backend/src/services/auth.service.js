import bcrypt from 'bcryptjs';
import { Admin } from '../models/Admin.js';
import { env } from '../config/env.js';
import { signAdminToken } from '../utils/jwt.js';

const publicAdmin = (admin) => ({
  id: admin.id,
  name: admin.name,
  email: admin.email,
  role: admin.role
});

const isRegistrationKeyValid = (providedKey) => (
  Boolean(env.adminRegistrationKey) && providedKey === env.adminRegistrationKey
);

export const registerAdmin = async ({ name, email, password, registrationKey }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const existingAdminCount = await Admin.countDocuments();

  if (env.adminRegistrationMode === 'disabled') {
    const error = new Error('Admin registration is disabled.');
    error.statusCode = 403;
    throw error;
  }

  if (env.adminRegistrationMode === 'key' && !isRegistrationKeyValid(registrationKey)) {
    const error = new Error('A valid admin registration key is required.');
    error.statusCode = 403;
    throw error;
  }

  if (env.adminRegistrationMode === 'bootstrap' && existingAdminCount > 0 && !isRegistrationKeyValid(registrationKey)) {
    const error = new Error('Bootstrap registration is closed.');
    error.statusCode = 403;
    throw error;
  }

  const existingAdmin = await Admin.findOne({ email: normalizedEmail }).select('_id').lean();
  if (existingAdmin) {
    const error = new Error('An admin with this email already exists.');
    error.statusCode = 409;
    throw error;
  }

  const admin = await Admin.create({ name: name.trim(), email: normalizedEmail, password });
  return publicAdmin(admin);
};

export const loginAdmin = async ({ email, password }) => {
  const admin = await Admin.findOne({ email: email.trim().toLowerCase() }).select('+password');
  const passwordMatches = admin ? await bcrypt.compare(password, admin.password) : false;

  if (!admin || !passwordMatches) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  return { admin: publicAdmin(admin), token: signAdminToken(admin) };
};
